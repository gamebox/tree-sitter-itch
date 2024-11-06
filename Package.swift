// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterItch",
    products: [
        .library(name: "TreeSitterItch", targets: ["TreeSitterItch"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterItch",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                // NOTE: if your language has an external scanner, add it here.
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterItchTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterItch",
            ],
            path: "bindings/swift/TreeSitterItchTests"
        )
    ],
    cLanguageStandard: .c11
)
