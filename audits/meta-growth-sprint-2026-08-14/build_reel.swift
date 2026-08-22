import AppKit
import AVFoundation
import CoreVideo

let outputDir = URL(fileURLWithPath: CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : FileManager.default.currentDirectoryPath)
let outputURL = outputDir.appendingPathComponent("broker-api-duplicate-orders-30s.mp4")
try? FileManager.default.removeItem(at: outputURL)

let sceneSpecs: [(String, Int)] = [
    ("reel-scene-01.png", 3),
    ("reel-scene-02.png", 6),
    ("reel-scene-03.png", 6),
    ("reel-scene-04.png", 6),
    ("reel-scene-05.png", 5),
    ("reel-scene-06.png", 4),
]
let fps: Int32 = 30
let width = 1080
let height = 1920

func loadCGImage(_ name: String) throws -> CGImage {
    let url = outputDir.appendingPathComponent(name)
    guard let image = NSImage(contentsOf: url),
          let cg = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
        throw NSError(domain: "SignalCraftReel", code: 1, userInfo: [NSLocalizedDescriptionKey: "Cannot load \(name)"])
    }
    return cg
}

let images = try sceneSpecs.map { try loadCGImage($0.0) }
let writer = try AVAssetWriter(outputURL: outputURL, fileType: .mp4)
let settings: [String: Any] = [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: width,
    AVVideoHeightKey: height,
    AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: 6_000_000,
        AVVideoMaxKeyFrameIntervalKey: 60,
        AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
    ],
]
let input = AVAssetWriterInput(mediaType: .video, outputSettings: settings)
input.expectsMediaDataInRealTime = false
let attrs: [String: Any] = [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
    kCVPixelBufferWidthKey as String: width,
    kCVPixelBufferHeightKey as String: height,
]
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: attrs)
guard writer.canAdd(input) else { throw NSError(domain: "SignalCraftReel", code: 2, userInfo: [NSLocalizedDescriptionKey: "Cannot add video input"]) }
writer.add(input)
guard writer.startWriting() else { throw writer.error ?? NSError(domain: "SignalCraftReel", code: 3) }
writer.startSession(atSourceTime: .zero)

let colorSpace = CGColorSpaceCreateDeviceRGB()
let totalFrames = sceneSpecs.reduce(0) { $0 + $1.1 * Int(fps) }
var frameNumber: Int64 = 0

func appendFrame(image: CGImage, nextImage: CGImage?, localFrame: Int, sceneFrames: Int) throws {
    var maybeBuffer: CVPixelBuffer?
    guard let pool = adaptor.pixelBufferPool,
          CVPixelBufferPoolCreatePixelBuffer(nil, pool, &maybeBuffer) == kCVReturnSuccess,
          let buffer = maybeBuffer else {
        throw NSError(domain: "SignalCraftReel", code: 4, userInfo: [NSLocalizedDescriptionKey: "Cannot allocate pixel buffer"])
    }
    CVPixelBufferLockBaseAddress(buffer, [])
    defer { CVPixelBufferUnlockBaseAddress(buffer, []) }
    guard let base = CVPixelBufferGetBaseAddress(buffer),
          let context = CGContext(
            data: base,
            width: width,
            height: height,
            bitsPerComponent: 8,
            bytesPerRow: CVPixelBufferGetBytesPerRow(buffer),
            space: colorSpace,
            bitmapInfo: CGImageAlphaInfo.premultipliedFirst.rawValue | CGBitmapInfo.byteOrder32Little.rawValue
          ) else {
        throw NSError(domain: "SignalCraftReel", code: 5, userInfo: [NSLocalizedDescriptionKey: "Cannot create frame context"])
    }

    context.setFillColor(NSColor.black.cgColor)
    context.fill(CGRect(x: 0, y: 0, width: width, height: height))
    let progress = Double(frameNumber) / Double(max(1, totalFrames - 1))
    let pulse = 1.0 + 0.006 * sin(Double(localFrame) / Double(fps) * .pi * 2.0)
    let drawW = Double(width) * pulse
    let drawH = Double(height) * pulse
    let rect = CGRect(x: (Double(width) - drawW) / 2, y: (Double(height) - drawH) / 2, width: drawW, height: drawH)
    context.draw(image, in: rect)

    let crossfadeFrames = Int(fps) / 3
    if let next = nextImage, localFrame >= sceneFrames - crossfadeFrames {
        let alpha = CGFloat(localFrame - (sceneFrames - crossfadeFrames)) / CGFloat(crossfadeFrames)
        context.saveGState()
        context.setAlpha(alpha)
        context.draw(next, in: CGRect(x: 0, y: 0, width: width, height: height))
        context.restoreGState()
    }

    context.setFillColor(NSColor(calibratedRed: 0.12, green: 0.88, blue: 0.84, alpha: 0.95).cgColor)
    context.fill(CGRect(x: 0, y: 14, width: Double(width) * progress, height: 8))

    while !input.isReadyForMoreMediaData { Thread.sleep(forTimeInterval: 0.002) }
    let time = CMTime(value: frameNumber, timescale: fps)
    guard adaptor.append(buffer, withPresentationTime: time) else {
        throw writer.error ?? NSError(domain: "SignalCraftReel", code: 6, userInfo: [NSLocalizedDescriptionKey: "Failed to append frame \(frameNumber)"])
    }
    frameNumber += 1
}

for (index, spec) in sceneSpecs.enumerated() {
    let sceneFrames = spec.1 * Int(fps)
    for local in 0..<sceneFrames {
        try autoreleasepool {
            try appendFrame(image: images[index], nextImage: index + 1 < images.count ? images[index + 1] : nil, localFrame: local, sceneFrames: sceneFrames)
        }
    }
}

input.markAsFinished()
let done = DispatchSemaphore(value: 0)
writer.finishWriting { done.signal() }
done.wait()
guard writer.status == .completed else { throw writer.error ?? NSError(domain: "SignalCraftReel", code: 7) }
print("Created \(outputURL.path) with \(frameNumber) frames")
