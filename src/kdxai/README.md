# KDxAI Company Website

This is the standalone KDxAI company website that can be deployed independently to kdxai.in.

## Structure

- **src/kdxai/**: Standalone KDxAI website
- **pages/Home.tsx**: Main homepage content (migrated from AboutKDxAI.tsx)
- **index.html**: Separate HTML entry point for KDxAI site
- **vite.config.ts**: Separate Vite config for independent builds

## Development

```bash
cd src/kdxai
npm run dev
```

## Build for Production

```bash
cd src/kdxai
npm run build
```

This will create a `dist-kdxai` folder that can be deployed to kdxai.in.

## Features

- ✅ SEO optimized with proper meta tags
- ✅ Semantic HTML structure
- ✅ Mobile responsive design
- ✅ Independent deployment ready
- ✅ Links to MVP products (XmPrepNEET, ITGym)
- ✅ Company branding and messaging
- ✅ Future product roadmap
- ✅ Contact and engagement sections

## Deployment

The built files in `dist-kdxai` can be uploaded to any static hosting service or CDN for kdxai.in domain.