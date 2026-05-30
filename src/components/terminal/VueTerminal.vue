<template>
  <div class="terminal-container" ref="terminalRef">
    <div class="terminal-header">
      <div class="terminal-controls">
        <div class="control control-red"></div>
        <div class="control control-yellow"></div>
        <div class="control control-green"></div>
      </div>
      <div class="terminal-title">SignCraft Studio Terminal</div>
    </div>
    <div class="terminal-body" ref="terminalBodyRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'

const terminalRef = ref(null)
const terminalBodyRef = ref(null)

let terminal = null
let fitAddon = null

onMounted(() => {
  // Initialize terminal
  terminal = new Terminal({
    cursorBlink: true,
    fontSize: 14,
    fontFamily: 'Menlo, "DejaVu Sans Mono", monospace',
    theme: {
      background: '#000000',
      foreground: '#ffffff',
      cursor: '#ffffff',
      selection: 'rgba(255, 255, 255, 0.3)',
      black: '#000000',
      red: '#ff0000',
      green: '#00ff00',
      yellow: '#ffff00',
      blue: '#0000ff',
      magenta: '#ff00ff',
      cyan: '#00ffff',
      white: '#ffffff',
      brightBlack: '#555555',
      brightRed: '#ff5555',
      brightGreen: '#55ff55',
      brightYellow: '#ffff55',
      brightBlue: '#5555ff',
      brightMagenta: '#ff55ff',
      brightCyan: '#55ffff',
      brightWhite: '#ffffff'
    }
  })
  
  fitAddon = new FitAddon()
  terminal.loadAddon(fitAddon)
  
  // Mount terminal to the container
  terminal.open(terminalBodyRef.value)
  
  // Fit the terminal to the container
  fitAddon.fit()
  
  // Handle resize
  const resizeObserver = new ResizeObserver(() => {
    fitAddon.fit()
  })
  
  resizeObserver.observe(terminalRef.value)
  
  // Welcome message
  terminal.welcome()
  
  // Handle keyboard input
  terminal.onData((data) => {
    // In a real app, you'd send this to a backend via WebSocket or API
    // For demo, we'll echo it back
    terminal.write(data)
  })
})

onBeforeUnmount(() => {
  if (terminal) {
    terminal.dispose()
  }
})

function writeWelcome() {
  const welcomeMsg = `
SignCraft Studio Terminal
Type 'help' for available commands

$ `
  terminal.write(welcomeMsg)
}

Terminal.prototype.welcome = function() {
  this.write(`
  ███╗   ███╗ █████╗ ███╗   ██╗███████╗
  ████╗ ████║██╔══██╗████╗  ██║██╔════╝
  ██╔████╔██║███████║██╔██╗ ██║███████╗
  ██║╚██╔╝██║██╔══██║██║╚██╗██║╚════██║
  ██║ ╚═╝ ██║██║  ██║██║ ╚████║███████║
  ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝

  SignCraft Studio Development Terminal
  Type 'help' for available commands

  $ `)
}
</script>

<style scoped>
.terminal-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #000000;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.terminal-header {
  display: flex;
  align-items: center;
  height: 24px;
  background: #ededed;
  padding: 0 8px;
  border-bottom: 1px solid #ccc;
}

.terminal-controls {
  display: flex;
  gap: 6px;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.control-red { background: #ff5f56; }
.control-yellow { background: #ffbd2e; }
.control-green { background: #27c93f; }

.terminal-title {
  flex: 1;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #555;
  font-family: 'SF Mono', 'Menlo', monospace;
}

.terminal-body {
  flex: 1;
  overflow: hidden;
  position: relative;
  background: #000000;
}

/* Make terminal focusable */
.terminal-body:focus {
  outline: none;
}

/* Cursor styling */
.terminal .xterm-cursor {
  background-color: #ffffff !important;
}
</style>