<template>
  <div class="app">
    <header class="header">
      <h1 class="title">Make It Fancy</h1>
    </header>
    <main class="main">
      <p
        class="description"
      >Just type something below, and click a transform to copy the stylized text to your clipboard.</p>

      <input type="text" class="input" v-model="text" placeholder="Write your text here" autofocus>
      <ul class="transform-list">
        <li
          class="transform-list-item"
          v-for="name of transformNames"
          tabindex="0"
          :key="name"
          @click="applyAndCopyToClipboard(name)"
          @keydown.enter="applyAndCopyToClipboard(name)"
        >
          <span>{{applyTransform(name, name)}}</span>
          <svg viewBox="0 0 24 24" class="clipboard">
            <path
              fill="#000000"
              d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
            ></path>
          </svg>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import { transformDictionaries } from "./transforms";

export default {
  data() {
    return {
      text: "",
      transformDictionaries
    };
  },

  computed: {
    transformNames() {
      console.log(transformDictionaries);
      return Object.keys(this.transformDictionaries);
    }
  },

  methods: {
    applyTransform(transformName, text = "") {
      const transform = transformDictionaries[transformName];

      if (!transform) {
        return text;
      }

      return text
        .split("")
        .map(char => transform[char] || char)
        .join("");
    },

    async applyAndCopyToClipboard(transformName) {
      const textToCopy = this.applyTransform(
        transformName,
        this.text || transformName
      );

      try {
        await navigator.clipboard.writeText(textToCopy);
      } catch (err) {
        console.error("There was an issue copying to clipboard");
      }
    }
  }
};
</script>

<style>
:root {
  --color-primary: #006bb7;
  --color-accent: #00b84c;
  --color-gray: #bec4c8;
  --color-white: #ffffff;

  --spacing-root: 1rem;
}

html,
body {
  width: 400px;
  height: 400px;
}

body {
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-family: "Raleway", sans-serif;
  position: relative;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
  padding: 0;
  font-weight: 400;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  padding: 8px;
  background: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-root);
}

.main {
  flex-grow: 1;
  padding: var(--spacing-root);
}

.description {
  margin-bottom: 1.5rem;
}

input[type="text"] {
  -webkit-appearance: none;
  font-size: 1rem;
  width: 100%;
  padding: 0.4rem 1rem;
  margin: 0;
  box-sizing: border-box;
  border: 2px solid #f2f2f2;
  background: #fff;
  border-radius: 1rem;
  box-shadow: inset 0 0 0.512rem rgba(0, 0, 0, 0.03);
  transition: 0.6s;
}

input[type="text"]:focus {
  outline: none;
  border-color: var(--color-primary);
  /* border-color: var(--color-primary); */
}

.title {
  font-size: 1.2rem;
}

.transform-list {
  padding: 0;
  list-style: none;
}

.transform-list-item {
  padding: var(--spacing-root);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background-color: #ebedee;
  border-radius: 4px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.03);
}

.transform-list-item:hover,
.transform-list-item:focus {
  background-color: #dee1e3;
}

.transform-list-item:not(:last-child) {
  margin-bottom: 0.5rem;
}

.clipboard {
  height: 24px;
  width: 24px;
}
</style>
