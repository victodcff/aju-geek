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
        const contador = document.getElementById("contador-produtos");

        const modal = document.getElementById("modal");
        const modalImg = document.getElementById("modal-img");
        const modalNome = document.getElementById("modal-nome");
        const modalAnime = document.getElementById("modal-anime");
        const modalStatus = document.getElementById("modal-status");
        const modalWhatsapp = document.getElementById("modal-whatsapp");
        const fecharModal = document.getElementById("fechar-modal");

        const filtros = document.querySelectorAll(".filtro-btn");

        let cards = [];

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

            card.dataset.nome = produto.nome.toLowerCase();
            card.dataset.anime = produto.anime.toLowerCase();
            card.dataset.status = produto.status;

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

            cards.push(card);

        });

        function atualizarContador() {

            const visiveis = cards.filter(card =>
                card.style.display !== "none"
            ).length;

            contador.textContent =
                `${visiveis} produtos encontrados`;

        }

        atualizarContador();

        pesquisa.addEventListener("input", () => {

            const termo = pesquisa.value.toLowerCase();

            cards.forEach(card => {

                const nome = card.dataset.nome;
                const anime = card.dataset.anime;

                if (
                    nome.includes(termo) ||
                    anime.includes(termo)
                ) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }

            });

            atualizarContador();

        });

        filtros.forEach(botao => {

            botao.addEventListener("click", () => {

                filtros.forEach(btn =>
                    btn.classList.remove("ativo")
                );

                botao.classList.add("ativo");

                const filtro =
                    botao.textContent.trim();

                cards.forEach(card => {

                    const status =
                        card.dataset.status;

                    if (
                        filtro === "Todos" ||
                        filtro === "Disponíveis" && status === "Disponível" ||
                        filtro === "Em Breve" && status === "Em Breve" ||
                        filtro === "Esgotados" && status === "Esgotado"
                    ) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }

                });

                atualizarContador();

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