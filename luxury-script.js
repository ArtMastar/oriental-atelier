/* ==========================================================
   ORIENTAL ATELIER PRESTIGE - DATA & LOGIC
========================================================== */

const luxuryProducts = [
    {
        id: 101,
        name: "The Sovereign Imperial Electric Recliner",
        price: "Ksh. 185,000",
        category: "electric",
        tag: "Motorized Flagship",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
        description: "Engineered with dual silent German OKIN motors, independent headrest adjustment, and full zero-gravity weightless elevation upholstered in full-grain Italian calfskin."
    },
    {
        id: 102,
        name: "Milano Prestige Home Cinema Suite",
        price: "Ksh. 340,000",
        category: "sectional",
        tag: "Bespoke Modular",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
        description: "A masterwork in architectural luxury. Features integrated cooling cup holders, touch-capacitive motion controls, and diamond-quilted top-grain leather."
    },
    {
        id: 103,
        name: "Aura Zero-Gravity Executive Recliner",
        price: "Ksh. 145,000",
        category: "recliners",
        tag: "Ergonomic Masterpiece",
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800",
        description: "Designed for elite home offices and private libraries. Combines classic mid-century lines with whisper-quiet electric reclining mechanics."
    },
    {
        id: 104,
        name: "Valhalla Smart Power Motion Sofa",
        price: "Ksh. 290,000",
        category: "electric",
        tag: "Smart Integration",
        image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800",
        description: "Equipped with biometric memory presets, ambient LED floor grazing lights, hidden storage compartments, and USB-C fast charging stations."
    },
    {
        id: 105,
        name: "Regal Ascot Manual-Assist Recliner",
        price: "Ksh. 115,000",
        category: "recliners",
        tag: "Heritage Craft",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
        description: "Hand-stitched burnished leather paired with hand-carved mahogany wooden legs, offering effortless weight-shift reclining mechanics."
    },
    {
        id: 106,
        name: "Empire Smart Modular Sectional",
        price: "Ksh. 420,000",
        category: "sectional",
        tag: "Ultra-Exclusivity",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800",
        description: "Custom-built configuration featuring modular motorized lounge units, acoustic privacy panels, and premium goose-down feather cushioning."
    }
];

document.addEventListener("DOMContentLoaded", function () {
    renderLuxuryGallery(luxuryProducts);

    // Filter Logic
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

// Modal Logic
const modal = document.getElementById("luxuryModal");
const closeModal = document.querySelector(".lux-close");

function openLuxuryModal(product) {
    document.getElementById("luxModalImage").src = product.image;
    document.getElementById("luxModalName").textContent = product.name;
    document.getElementById("luxModalPrice").textContent = product.price;
    document.getElementById("luxModalDesc").textContent = product.description;

    const whatsappBtn = document.getElementById("conciergeOrderBtn");
    whatsappBtn.onclick = function() {
        let phoneNumber = "254745485817";
        let message = `Hello Oriental Atelier Concierge,\n\nI am interested in a private inquiry for the following prestige piece:\n- *${product.name}* (${product.price})\n\nPlease share custom leather swatches and availability.`;
        let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    modal.style.display = "flex";
}

closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};