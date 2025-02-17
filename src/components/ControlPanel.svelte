<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let isExpanded = false;
  export let settings = {
    particleSpeed: 0.1,
    repulsionForce: 100,
    repulsionRadius: 150,
    returnSpeed: 0.02,
    baseHue: 220,
    rangeHue: 100,
    particleCount: 700,
    glowIntensity: 200
  };

  function updateSetting(key, value) {
    settings[key] = Number(value);
    dispatch('update', settings);
  }

  function togglePanel() {
    isExpanded = !isExpanded;
  }
</script>

<div class="control-panel" class:expanded={isExpanded}>
  <button class="toggle-button" on:click={togglePanel}>
    {isExpanded ? '×' : '⚙'}
  </button>
  
  {#if isExpanded}
    <div class="controls">
      <h3>Particle Settings</h3>
      
      <div class="control-group">
        <label>
          Particle Speed
          <input 
            type="range" 
            min="0.1" 
            max="3" 
            step="0.1" 
            value={settings.particleSpeed}
            on:input={(e) => updateSetting('particleSpeed', e.target.value)}
          />
          <span class="value">{settings.particleSpeed.toFixed(2)}</span>
        </label>
      </div>

      <div class="control-group">
        <label>
          Repulsion Force
          <input 
            type="range" 
            min="0" 
            max="200" 
            step="1" 
            value={settings.repulsionForce}
            on:input={(e) => updateSetting('repulsionForce', e.target.value)}
          />
          <span class="value">{settings.repulsionForce}</span>
        </label>
      </div>

      <div class="control-group">
        <label>
          Repulsion Radius
          <input 
            type="range" 
            min="50" 
            max="300" 
            step="1" 
            value={settings.repulsionRadius}
            on:input={(e) => updateSetting('repulsionRadius', e.target.value)}
          />
          <span class="value">{settings.repulsionRadius}px</span>
        </label>
      </div>

      <div class="control-group">
        <label>
          Return Speed
          <input 
            type="range" 
            min="0.01" 
            max="0.1" 
            step="0.01" 
            value={settings.returnSpeed}
            on:input={(e) => updateSetting('returnSpeed', e.target.value)}
          />
          <span class="value">{settings.returnSpeed.toFixed(2)}</span>
        </label>
      </div>

      <div class="control-group">
        <label>
          Base Color (Hue)
          <input 
            type="range" 
            min="0" 
            max="360" 
            step="1" 
            value={settings.baseHue}
            on:input={(e) => updateSetting('baseHue', e.target.value)}
          />
          <span class="value">{settings.baseHue}°</span>
        </label>
      </div>

      <div class="control-group">
        <label>
          Color Range
          <input 
            type="range" 
            min="0" 
            max="360" 
            step="1" 
            value={settings.rangeHue}
            on:input={(e) => updateSetting('rangeHue', e.target.value)}
          />
          <span class="value">{settings.rangeHue}°</span>
        </label>
      </div>

      <div class="control-group">
        <label>
          Glow Intensity
          <input 
            type="range" 
            min="100" 
            max="400" 
            step="10" 
            value={settings.glowIntensity}
            on:input={(e) => updateSetting('glowIntensity', e.target.value)}
          />
          <span class="value">{settings.glowIntensity}%</span>
        </label>
      </div>
    </div>
  {/if}
</div>

<style>
  .control-panel {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: rgba(13, 12, 24, 0.8);
    border-radius: 8px;
    backdrop-filter: blur(10px);
    color: white;
    z-index: 1000;
    transition: all 0.3s ease;
    border: 1px solid rgba(139, 92, 246, 0.3);
  }

  .expanded {
    padding: 20px;
    width: 300px;
  }

  .toggle-button {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    background: rgba(13, 12, 24, 0.8);
    border: 1px solid rgba(139, 92, 246, 0.3);
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .expanded .toggle-button {
    position: absolute;
    top: 10px;
    right: 10px;
    left: auto;
  }

  .controls {
    margin-top: 40px;
  }

  h3 {
    margin: 0 0 1rem 0;
    color: #8B5CF6;
  }

  .control-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #a8a8a8;
  }

  input[type="range"] {
    width: 100%;
    margin: 0.5rem 0;
  }

  .value {
    float: right;
    color: #8B5CF6;
  }

  /* Custom range input styling */
  input[type="range"] {
    -webkit-appearance: none;
    height: 4px;
    background: rgba(139, 92, 246, 0.3);
    border-radius: 2px;
    outline: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    background: #8B5CF6;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  input[type="range"]::-webkit-slider-thumb:hover {
    background: #9F7AEA;
    transform: scale(1.1);
  }
</style>
