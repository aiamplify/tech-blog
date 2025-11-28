# TechPulse News - Admin Guide

## Login Credentials

**Username:** `admin`  
**Password:** `password123`

## How to Use the Creator Studio

### 1. Sign In
- Click the "Sign In" button in the header
- Enter the credentials above
- You'll be redirected to the Creator Studio

### 2. Create a Blog Post

The Creator Studio is a simple, manual content creation tool. No AI required!

#### Add an Image
You have two options:

**Option 1: Upload an Image**
- Click the purple "Upload Image" button
- Select an image from your computer
- Max file size: 5MB
- Supported formats: JPG, PNG, GIF, WebP
- The image will be stored locally in your browser

**Option 2: Use an Image URL**
- Paste any image URL into the "Enter image URL" field
- The image will load from the external URL

#### Fill in the Details

1. **Title*** (Required)
   - Enter a catchy headline for your article

2. **Category**
   - Choose from: AI, Robotics, Hardware, Software, Security, Innovation, or Technology

3. **Excerpt (Summary)**
   - Write a brief 2-3 sentence summary
   - This appears in the article preview cards

4. **Content*** (Required)
   - Write your full article content
   - **Supports HTML formatting** for rich text
   - Use HTML tags like:
     - `<h2>` for main headings
     - `<h3>` for subheadings
     - `<p>` for paragraphs
     - `<strong>` for bold text
     - `<em>` for italic text
     - `<ul>` and `<li>` for bullet lists
     - `<ol>` and `<li>` for numbered lists
     - `<blockquote>` for quotes

### 3. Preview Your Post
- The right panel shows a live preview
- See exactly how your post will look
- Preview updates as you type

### 4. Publish
- Click the green "Publish Post" button
- Your post will immediately appear on the homepage
- Posts are stored in your browser's local storage

## Example HTML Content

```html
<p>This is an introduction paragraph with <strong>bold text</strong> for emphasis.</p>

<h2>First Major Section</h2>
<p>Content for the first section goes here.</p>

<h3>A Subsection</h3>
<p>More detailed information about a specific topic.</p>

<ul>
  <li>First bullet point</li>
  <li>Second bullet point</li>
  <li>Third bullet point</li>
</ul>

<blockquote>
  "A powerful quote or key takeaway"
</blockquote>

<h2>Second Major Section</h2>
<p>Continue with more content as needed.</p>
```

## Features

- **Manual Control:** You write everything yourself
- **Image Upload:** Upload images directly from your computer
- **Image URLs:** Or use external image URLs
- **HTML Formatting:** Full control over text formatting
- **Live Preview:** See your post before publishing
- **Persistent Storage:** Posts are saved locally
- **No Code Required:** Manage all content through the web interface

## Notes

- All data is stored in your browser's localStorage
- Published articles appear at the top of the homepage grid
- You can create unlimited posts
- Images uploaded are stored as base64 (embedded in the article data)
- No API keys or external services required!
