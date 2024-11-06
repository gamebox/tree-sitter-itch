-- CREDIT FOR THIS FILE: https://github.com/IndianBoy42/tree-sitter-just/blob/main/lua/tree-sitter-just/init.lua
local M = {}

function M.setup(_)
	local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
	parser_config.templ = {
		install_info = {
			url = "https://github.com/gamebox/tree-sitter-itch.git",
			files = { "src/parser.c" },
			branch = "main",
		},
		maintainers = { "gamebox" },
	}
	local ok, ft = pcall(require, "filetype")
	if ok then
		ft.setup({
			overrides = {
				extensions = {
					itch = "itch",
				},
			},
		})
	end
end

return M
