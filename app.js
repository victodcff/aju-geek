fetch("data/catalogo.json")
    .then(response => response.json())
    .then(data => {

        data.produtos.sort((a, b) => {

            const ordem = {
                "Disponível": 1,
                "Em Breve": 2,
                "Esgotado": 3
            };

            return ordem[a.status] - ordem[b.status];

        });

        const produtosContainer = document.getElementById("produtos");
        const pesquisa = document.getElementById("pesquisa");
        const modal = document.getElementById("modal");
        const modalImg = document.getElementById("modal-img");
        const modalNome = document.getElementById("modal-nome");
        const modalAnime = document.getElementById("modal-anime");
        const modalStatus = document.getElementById("modal-status");
        const modalWhatsapp = document.getElementById("modal-whatsapp");
        const fecharModal = document.getElementById("fechar-modal");

        data.produtos.forEach(produto => {

            const card = document.createElement("div");

            card.classList.add("card-produto");

            let classeStatus = "";

            if (produto.status === "Disponível") {
                classeStatus = "disponivel";
            } else if (produto.status === "Esgotado") {
                classeStatus = "esgotado";
            } else {
                classeStatus = "embreve";
            }

            card.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>${produto.anime}</p>
                <span class="status ${classeStatus}">
                    ${produto.status}
                </span>
            `;

            card.addEventListener("click", () => {

                modal.style.display = "flex";

                modalImg.src = produto.imagem;
                modalNome.textContent = produto.nome;
                modalAnime.textContent = produto.anime;

                modalStatus.textContent = produto.status;
                modalStatus.className = `status ${classeStatus}`;

                modalWhatsapp.href =
                    `https://wa.me/5579996263283?text=Olá! Tenho interesse no figure ${produto.nome}.`;

            });

            produtosContainer.appendChild(card);
            pesquisa.addEventListener("input", () => {

    const termo = pesquisa.value.toLowerCase();

    const nome = produto.nome.toLowerCase();
    const anime = produto.anime.toLowerCase();

    if (
        nome.includes(termo) ||
        anime.includes(termo)
    ) {
        card.style.display = "block";
    } else {
        card.style.display = "none";
    }

});
        });

        fecharModal.addEventListener("click", () => {
            modal.style.display = "none";
        });

        window.addEventListener("click", (e) => {

            if (e.target === modal) {
                modal.style.display = "none";
            }

        });

    });