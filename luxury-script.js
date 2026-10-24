/* ==========================================================
   ORIENTAL ATELIER PRESTIGE - DATA & LOGIC WITH COLOR VARIANTS
========================================================== */

const luxuryProducts = [
    {
        id: 101,
        name: "The Sovereign Imperial Electric Recliner",
        price: "Ksh. 185,000",
        category: "electric",
        tag: "Motorized Flagship",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
        description: "Engineered with dual silent German OKIN motors, independent headrest adjustment, and full zero-gravity weightless elevation upholstered in full-grain Italian calfskin.",
        variants: [
            {
                colorName: "Obsidian Black",
                hex: "#111111",
                image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800"
            },
            {
                colorName: "Cognac Tan",
                hex: "#9e5828",
                image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800"
            },
            {
                colorName: "Champagne Cream",
                hex: "#e8e1d5",
                image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    {
        id: 102,
        name: "Milano Prestige Home Cinema Suite",
        price: "Ksh. 340,000",
        category: "sectional",
        tag: "Bespoke Modular",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
        description: "A masterwork in architectural luxury. Features integrated cooling cup holders, touch-capacitive motion controls, and diamond-quilted top-grain leather.",
        variants: [
            {
                colorName: "Emerald Green",
                hex: "#1a3c2e",
                image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800"
            },
            {
                colorName: "Midnight Navy",
                hex: "#121b2d",
                image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    {
        id: 103,
        name: "Aura Zero-Gravity Executive Recliner",
        price: "Ksh. 145,000",
        category: "recliners",
        tag: "Ergonomic Masterpiece",
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800",
        description: "Designed for elite home offices and private libraries. Combines classic mid-century lines with whisper-quiet electric reclining mechanics.",
        variants: [
            {
                colorName: "Cognac Tan",
                hex: "#9e5828",
                image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800"
            },
            {
                colorName: "Classic Black",
                hex: "#1a1a1a",
                image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800"
            }
        ]
    }
];

document.addEventListener("DOMContentLoaded", function () {
    renderLuxuryGallery(luxuryProducts);

    // Filter Button Logic
    const filterButtons = document.querySelectorAll(".p-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const category = btn.dataset.category;
            if (category === "all") {
                renderLuxuryGallery(luxuryProducts);
            } else {
                const filtered = luxuryProducts.filter(p => p.category === category);
                renderLuxuryGallery(filtered);
            }
        });
    });
});

function renderLuxuryGallery(items) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    items.forEach(product => {
        const card = document.createElement("div");
        card.className = "lux-card";

        card.innerHTML = `
            <div class="lux-img-container">
                <span class="lux-tag">${product.tag}</span>
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="lux-info">
                <h3>${product.name}</h3>
                <p class="lux-price">${product.price}</p>
                <button class="view-bespoke-btn">Request Private Viewing</button>
            </div>
        `;

        card.addEventListener("click", () => openLuxuryModal(product));
        gallery.appendChild(card);
    });
}

// Modal & Dynamic Color Variant Logic
const modal = document.getElementById("luxuryModal");
const closeModal = document.querySelector(".lux-close");
let selectedColorName = "";

function openLuxuryModal(product) {
    const modalImage = document.getElementById("luxModalImage");
    const colorsContainer = document.getElementById("luxModalColors");

    // Populate static fields
    document.getElementById("luxModalName").textContent = product.name;
    document.getElementById("luxModalPrice").textContent = product.price;
    document.getElementById("luxModalDesc").textContent = product.description;

    // Clear previous color options
    colorsContainer.innerHTML = "";

    // Load Variants (or default fallback)
    const variants = product.variants && product.variants.length > 0 
        ? product.variants 
        : [{ colorName: "Standard Finish", hex: "#c5a880", image: product.image }];

    // Set initial active variant
    modalImage.src = variants[0].image;
    selectedColorName = variants[0].colorName;

    // Render Color Selection Buttons
    variants.forEach((variant, index) => {
        const btn = document.createElement("button");
        btn.className = `color-btn ${index === 0 ? "active" : ""}`;
        btn.innerHTML = `
            <span class="color-dot" style="background-color: ${variant.hex};"></span>
            <span>${variant.colorName}</span>
        `;

        btn.addEventListener("click", () => {
            // Update active state
            document.querySelectorAll(".color-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Update modal image with smooth transition
            modalImage.style.opacity = "0.4";
            setTimeout(() => {
                modalImage.src = variant.image;
                modalImage.style.opacity = "1";
            }, 150);

            selectedColorName = variant.colorName;
        });

        colorsContainer.appendChild(btn);
    });

    // Configure WhatsApp Concierge Button
    const whatsappBtn = document.getElementById("conciergeOrderBtn");
    whatsappBtn.onclick = function() {
        let phoneNumber = "254745485817";
        let message = `Hello Oriental Atelier Concierge,\n\nI am interested in a private inquiry for the following prestige piece:\n- *${product.name}*\n- *Selected Color/Finish:* ${selectedColorName}\n- *Price:* ${product.price}\n\nPlease share availability and leather swatches.`;
        let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    modal.style.display = "flex";
}

closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};