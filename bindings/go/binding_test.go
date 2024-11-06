package tree_sitter_itch_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_itch "www.github.com/gamebox/tree-sitter-itch/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_itch.Language())
	if language == nil {
		t.Errorf("Error loading Itch grammar")
	}
}
