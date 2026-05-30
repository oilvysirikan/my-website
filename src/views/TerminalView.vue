<template>
  <div class="terminal-page">
    <header class="page-header">
      <h1>Developer Terminal</h1>
      <p>Access the SignCraft Studio development environment</p>
    </header>

    <section class="terminal-section">
      <div class="terminal-wrapper">
        <VueTerminal />
      </div>
      
      <div class="terminal-info">
        <h2>Available Commands</h2>
        <div class="command-list">
          <div class="command-item">
            <span class="command-name">help</span>
            <span class="command-description">Show available commands</span>
          </div>
          <div class="command-item">
            <span class="command-name">status</span>
            <span class="command-description">Check system status</span>
          </div>
          <div class="command-item">
            <span class="command-name">services</span>
            <span class="command-description">List available services</span>
          </div>
          <div class="command-item">
            <span class="command-name">portfolio</span>
            <span class="command-description">View portfolio items</span>
          </div>
          <div class="command-item">
            <span class="command-name">clear</span>
            <span class="command-description">Clear terminal screen</span>
          </div>
          <div class="command-item">
            <span class="command-name">exit</span>
            <span class="command-description">Exit terminal session</span>
          </div>
        </div>
        
        <div class="terminal-note">
          <p><strong>Note:</strong> This is a simulated terminal for demonstration purposes. In a production environment, this would connect to a real backend via WebSocket for actual command execution.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import VueTerminal from '@/components/terminal/VueTerminal.vue'
</script>

<style scoped>
.terminal-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  background-color: var(--color-pure-white);
}

.page-header {
  text-align: center;
  padding: 6rem 2rem 4rem;
  background: var(--color-pure-white);
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(
    to bottom,
    var(--color-pure-white),
    rgba(212, 175, 55, 0.05)
  );
  pointer-events: none;
}

.page-header h1 {
  font-family: var(--font-heading);
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--color-deep-black);
  line-height: 1.2;
  position: relative;
  display: inline-block;
}

.page-header h1::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 50px;
  height: 3px;
  background: var(--color-royal-gold);
}

.page-header p {
  font-family: var(--font-body);
  font-size: 1.25rem;
  font-style: italic;
  color: var(--color-royal-gold);
  margin-bottom: 2rem;
  display: block;
}

.terminal-section {
  display: flex;
  gap: 3rem;
  margin-bottom: 5rem;
  align-items: flex-start;
}

.terminal-wrapper {
  flex: 1;
  min-width: 400px;
}

.terminal-info {
  flex: 1;
  min-width: 350px;
  background: var(--color-soft-gray);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.03);
}

.command-list {
  margin-top: 1.5rem;
}

.command-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.command-item:last-child {
  border-bottom: none;
}

.command-name {
  font-family: var(--font-heading);
  font-weight: 600;
  color: var(--color-deep-black);
}

.command-description {
  font-family: var(--font-body);
  color: #666;
}

.terminal-note {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0,0,0,0.1);
  font-size: 0.9375rem;
  color: #666;
  font-style: italic;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .terminal-page {
    padding: 0 1.5rem;
  }
  
  .page-header {
    padding: 5rem 1.5rem 3rem;
  }
  
  .page-header h1 {
    font-size: 2.5rem;
  }
  
  .terminal-section {
    flex-direction: column;
    gap: 2rem;
  }
  
  .terminal-wrapper,
  .terminal-info {
    min-width: 100%;
  }
}

@media (max-width: 768px) {
  .terminal-page {
    padding: 0 1rem;
  }
  
  .page-header {
    padding: 4rem 1rem 2.5rem;
  }
  
  .page-header h1 {
    font-size: 2.25rem;
  }
  
  .terminal-info {
    padding: 1.5rem;
  }
}
</style>