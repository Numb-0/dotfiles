return {
  "akinsho/bufferline.nvim", version = "*",
  dependecies = "nvim-tree/nvim-web-devicons",
  config = function()
    local bufferline = require("bufferline")

    local colors = {
      overlay1 = "#8087a2",
      surface1 = "#494d64",
      crust = "#181926",
      text = "#cad3f5",
      green = "#a6da95",
      red = "#ed8796",
      mauve = "#c6a0f6",
      yellow = "#eed49f",
      blue = "#8aadf4",
    }

    vim.opt.termguicolors = true
    bufferline.setup({
      options = {
        mode = "tabs",
        separator_style = "slope",
        offsets = {
          {
            filetype = "NvimTree",
            text = "Tree",
            highlight = "Directory",
            text_align = "left",
            --separator = true,
          },
        },
        highlights = {
          fill = {
            guifg = colors.text,
            guibg = colors.crust,
          },
          background = {
            guifg = colors.text,
            guibg = colors.crust,
          },
        },
      },
    })
  end
}
