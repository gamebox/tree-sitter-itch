/**
 * @file A parser for Itch, a friendly textual language for making Scratch projects
 * @author Anthony Bullard
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check
//

const newlines = /\n/;
module.exports = grammar({
  name: "itch",
  extras: ($) => [$.comment, /\s/],
  word: ($) => $.word,
  rules: {
    source_file: ($) => seq($.file_def, $._stop, newlines, optional($.decls)),
    _stop: (_) => token.immediate("."),
    file_def: ($) =>
      seq(choice($.stage, $.sprite), optional(field("name", $.words))),
    words: ($) => seq($.word, optional(repeat($.word))),

    comment: (_) => seq("#", repeat(/[^\n]/), newlines),

    // Decls
    decls: ($) => seq($.decl, repeat(seq(newlines, $.decl))),
    decl: ($) =>
      choice(
        $.decl_set,
        $.decl_var,
        $.decl_list,
        $.decl_broadcast,
        $.decl_costume,
        $.decl_sound,
        $.decl_block,
      ),
    decl_set: ($) =>
      seq("set", field("name", $.word), "=", field("value", $.literal), $._stop),
    decl_var: ($) =>
      seq("var", field("name", $.words), "=", field("value", $.literal), $._stop),
    decl_list: ($) =>
      seq("list", $.words, "=", "[", field("values", repeat($.literal)), "]", $._stop),
    decl_broadcast: ($) => seq("broadcast", $.string_literal, $._stop),
    decl_costume: ($) => seq("costume", $.string_literal, $._stop),
    decl_sound: ($) => seq("sound", $.string_literal, $._stop),
    decl_block: ($) => seq("block", $.segments, $._stop),

    // Segments
    segments: ($) => repeat1($.segment),
    segment: ($) =>
      choice($.seg_reporter, $.seg_field, $.literal, $.seg_mouth, $.word),
    literal: ($) => choice($.string_literal, $.number_literal),
    seg_reporter: ($) => seq("(", $.segments, ")"),
    seg_field: ($) => seq("[", repeat(/[^\]]/), "]"),
    seg_mouth: ($) =>
      seq("{", repeat(seq(newlines, $._stack_block)), newlines, "}"),

    string_literal: ($) => token(seq('"', repeat(/[^"]/), token.immediate('"'))),
    number_literal: (_) => token(/-?\d+(\.\d+)?/),

    sprite: (_) => token.immediate("sprite"),
    stage: (_) => token.immediate("stage"),

    word: () => /[_\p{XID_Start}][_\p{XID_Continue}]*/,
    string_content: (_) => token.immediate(prec(1, /[^"\n\\]+/)),

    // Hidden
    _stack_block: ($) => seq($.segments, $._stop),
  },
});
