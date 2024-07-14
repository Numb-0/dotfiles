vim.g.mapleader = " "

local keymap = vim.keymap

keymap.set("n", "<leader>+", "<C-a>", { desc = "Increment number"})
keymap.set("n", "<leader>-", "<C-x>", { desc = "Decrement number"})

keymap.set("n", "<leader>b", "<cmd>tabnew<CR>", {desc = "Open new tab"})
keymap.set("n", "<leader>c", "<cmd>tabclose<CR>", {desc = "Close current tab"})
keymap.set("n", "<Tab>", "<cmd>tabn<CR>", {desc = "Go to next tab"})
keymap.set("n", "<S-Tab>", "<cmd>tabp<CR>", {desc = "Go to previous tab"}) 

-- Comments
keymap.set("n", "<leader>/", "gcc", { desc = "comment toggle", remap = true })
keymap.set("v", "<leader>/", "gc", { desc = "comment toggle", remap = true })
