import XCTest
import SwiftTreeSitter
import TreeSitterItch

final class TreeSitterItchTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_itch())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Itch grammar")
    }
}
