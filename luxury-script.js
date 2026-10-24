/* ==========================================================
   ORIENTAL ATELIER PRESTIGE - DATA & LOGIC WITH COLOR VARIANTS
========================================================== */

const luxuryProducts = [
    {
        id: 101,
        name: "7 Seater recliner Sofa",
        price: "Ksh. 165,000",
        category: "manual",
        tag: "Motorized Flagship",
        image: "/products/sofas/7SV.webp",
        description: "Engineered with dual silent German OKIN motors, independent headrest adjustment, and full zero-gravity weightless elevation upholstered in full-grain Italian calfskin.",
        variants: [
            {
                colorName: "Grey Silver",
                hex: "#6e6c6c",
                image: "/products/sofas/7SV.webp"
            },
            {
                colorName: "Dark Blue",
                hex: "#0d0f2b",
                image: "/products/sofas/7DB.webp"
            },
            {
                colorName: "Cream White",
                hex: "#f1ede5",
                image: "/products/sofas/7CW.webp"
            },
            {
                colorName: "Coffee Brown",
                hex: "#794e04",
                image: "/products/sofas/7OCF.webp"
            }
        ]
    },
    {
        id: 102,
        name: "6 Seater Recliner SOfa",
        price: "Ksh. 140,000",
        category: "manual",
        tag: "Bespoke Modular",
        image: "/products/sofas/6CW.webp",
        description: "A masterwork in architectural luxury. Features integrated cooling cup holders, touch-capacitive motion controls, and diamond-quilted top-grain leather.",
        variants: [
            {
                colorName: "Grey Silver",
                hex: "#6e6c6c",
                image: "/products/sofas/6SV.webp"
            },
            {
                colorName: "Dark Blue",
                hex: "#0d0f2b",
                image: "/products/sofas/6DB.webp"
            },
            {
                colorName: "Cream White",
                hex: "#f1ede5",
                image: "/products/sofas/6CW.webp"
            },
            {
                colorName: "Coffee Brown",
                hex: "#794e04",
                image: "/products/sofas/6OCF.webp"
            }
        ]
    },
    {
        id: 103,
        name: "3 Seater Recliner Sofa",
        price: "Ksh. 68,000",
        category: "manual",
        tag: "Ergonomic Masterpiece",
        image: "/products/sofas/3BR.webp",
        description: "Designed for elite home offices and private libraries. Combines classic mid-century lines with whisper-quiet electric reclining mechanics.",
        variants: [
            {
                colorName: "Grey Silver",
                hex: "#6e6c6c",
                image: "/products/sofas/3SV.webp"
            },
            {
                colorName: "Dark Blue",
                hex: "#0d0f2b",
                image: "/products/sofas/3DB.webp"
            },
            {
                colorName: "Cream White",
                hex: "#f1ede5",
                image: "/products/sofas/3CW.webp"
            },
            {
                colorName: "Coffee Brown",
                hex: "#794e04",
                image: "/products/sofas/3OCF.webp"
            },
            {
                colorName: "Desert Brown",
                hex: "#ecb351",
                image: "/products/sofas/3BR.webp"
            }
        ]
    },
    {
        id: 104,
        name: "2 Seater Recliner Sofa",
        price: "Ksh. 55,000",
        category: "manual",
        tag: "Ergonomic Masterpiece",
        image: "/products/sofas/2BR.webp",
        description: "Designed for elite home offices and private libraries. Combines classic mid-century lines with whisper-quiet electric reclining mechanics.",
        variants: [
            {
                colorName: "Desert Brown",
                hex: "#ecb351",
                image: "/products/sofas/2BR.webp"
            },
            {
                colorName: "Grey Silver",
                hex: "#6e6c6c",
                image: "/products/sofas/2SV.webp"
            },
            {
                colorName: "Dark Blue",
                hex: "#0d0f2b",
                image: "/products/sofas/2DB.webp"
            },
            {
                colorName: "Cream White",
                hex: "#f1ede5",
                image: "/products/sofas/2CW.webp"
            },
            {
                colorName: "Coffee Brown",
                hex: "#794e04",
                image: "/products/sofas/2OCF.webp"
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