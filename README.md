# 🔴 Cipher Red — Ciberseguridad Táctica

Landing page de Cipher Red construida con Next.js 14 + Three.js WebGPU + Tailwind CSS.

---

## 🚀 Despliegue en Netlify (paso a paso)

### 1. Instala Node.js
Descarga desde https://nodejs.org la versión **LTS** (botón verde).

### 2. Instala dependencias localmente
```bash
npm install
```

### 3. Prueba en local (opcional)
```bash
npm run dev
# Abre http://localhost:3000
# Requiere Chrome con WebGPU habilitado
```

### 4. Sube a GitHub
```bash
git init
git add .
git commit -m "🔴 Cipher Red inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/cipherred.git
git push -u origin main
```

### 5. Despliega en Netlify
1. Ve a https://app.netlify.com
2. Clic en **"Add new site"** → **"Import from Git"**
3. Conecta tu cuenta de GitHub
4. Selecciona el repo `cipherred`
5. Netlify detecta automáticamente Next.js:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
6. Clic en **"Deploy site"**

### 6. Conecta tu dominio cipherred.tech
1. En Netlify → **Domain settings** → **Add custom domain**
2. Escribe `cipherred.tech`
3. Netlify te da los DNS servers
4. En Namecheap → **Domain** → **Nameservers** → pega los de Netlify
5. Espera 10-30 minutos → ¡listo!

---

## 🛠 Stack técnico
- **Next.js 14** — App Router
- **Three.js WebGPU** — Efectos 3D con bloom y scan line
- **@react-three/fiber** — Three.js en React
- **Tailwind CSS** — Estilos utilitarios
- **TypeScript** — Tipado estático

## ⚠️ Nota WebGPU
El hero 3D requiere **Chrome 113+** con WebGPU habilitado.
En otros navegadores carga normalmente sin el efecto 3D.

## 📧 Contacto
contacto@cipherred.tech | cipherred.tech
