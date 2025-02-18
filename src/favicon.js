import logo from './assets/logo.jpg'

// Update favicon
const link = document.querySelector("link[rel~='icon']")
if (link) {
  link.href = logo
}
