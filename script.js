// ========== SELEÇÃO DE ELEMENTOS HTML ==========
// Seleciona o container principal da aplicação
const caixaPrincipal = document.querySelector(".caixa-principal");

// Seleciona o container onde as perguntas serão exibidas
const caixaPerguntas = document.querySelector(".caixa-perguntas");

// Seleciona o container onde os botões de alternativas serão criados
const caixaAlternativas = document.querySelector(".caixa-alternativas");

// Seleciona o container onde o resultado final será mostrado
const caixaResultado = document.querySelector(".caixa-resultado");

// Seleciona o parágrafo onde o texto do resultado será inserido
const textoResultado = document.querySelector(".texto-resultado");

// ========== BASE DE DADOS DAS PERGUNTAS ==========
// Array contendo todas as perguntas do questionário com suas alternativas e tipos de personalidade
const perguntas = [
    {
        // Primeira pergunta: Prioridades no desenvolvimento da IA
        enunciado: "Com o avanço da inteligência artificial, qual deveria ser a principal prioridade no desenvolvimento desta tecnologia?",
        alternativas: [
            {
                // Alternativa 1: Foca em segurança e regulamentação (classificada como cautelosa)
                texto: "Garantir que a IA seja segura e beneficie toda a humanidade, com regulamentações claras",
                tipo: "cauteloso" // Tipo de personalidade para análise posterior
            },
            {
                // Alternativa 2: Foca em velocidade e competitividade (classificada como progressista)
                texto: "Acelerar o desenvolvimento para ganhar vantagem competitiva, mesmo com alguns riscos",
                tipo: "progressista" // Tipo de personalidade para análise posterior
            }
        ]
    },
    {
        // Segunda pergunta: IA na educação
        enunciado: "Como a IA deveria ser integrada no sistema educacional?",
        alternativas: [
            {
                texto: "Usar IA como ferramenta de apoio, mantendo professores humanos como protagonistas",
                tipo: "cauteloso" // Abordagem cautelosa: manter controle humano
            },
            {
                texto: "Implementar tutores de IA avançados que possam substituir parte do ensino tradicional",
                tipo: "progressista" // Abordagem progressista: substituição por IA
            }
        ]
    },
    {
        // Terceira pergunta: IA e mercado de trabalho
        enunciado: "Qual deveria ser a abordagem ideal para o emprego em um mundo com IA avançada?",
        alternativas: [
            {
                texto: "Criar programas de requalificação profissional e renda básica universal",
                tipo: "cauteloso" // Abordagem cautelosa: proteção social
            },
            {
                texto: "Deixar o mercado se adaptar naturalmente, focando em novas oportunidades de trabalho",
                tipo: "progressista" // Abordagem progressista: adaptação natural
            }
        ]
    },
    {
        // Quarta pergunta: Ética na IA
        enunciado: "Como garantir que o desenvolvimento da IA seja ético e responsável?",
        alternativas: [
            {
                texto: "Estabelecer comitês internacionais de ética e transparência obrigatória nos algoritmos",
                tipo: "cauteloso" // Abordagem cautelosa: regulamentação rigorosa
            },
            {
                texto: "Confiar na autorregulação das empresas de tecnologia e na evolução natural do mercado",
                tipo: "progressista" // Abordagem progressista: autorregulação
            }
        ]
    },
    {
        // Quinta pergunta: IA na tomada de decisões
        enunciado: "Qual seria o papel ideal da IA na tomada de decisões importantes da sociedade?",
        alternativas: [
            {
                texto: "IA deve apenas fornecer informações e análises, deixando decisões finais para humanos",
                tipo: "cauteloso" // Abordagem cautelosa: controle humano das decisões
            },
            {
                texto: "IA avançada pode tomar decisões complexas em áreas específicas, com supervisão humana",
                tipo: "progressista" // Abordagem progressista: delegação de decisões à IA
            }
        ]
    }
];

// ========== VARIÁVEIS DE CONTROLE EXPANDIDAS ==========
// Índice da pergunta atual sendo exibida (começa em 0)
let atual = 0;

// Array que armazena todas as respostas do usuário
let respostas = [];

// Array que armazena o histórico completo das escolhas para exibição final
let historiaFinal = [];

// Objeto que conta quantas respostas de cada tipo o usuário escolheu
let pontuacao = { cauteloso: 0, progressista: 0 };

// String que armazena o nome digitado pelo usuário na tela inicial
let nomeUsuario = "";

// Objeto que armazenará o perfil final calculado (Guardião, Pioneiro ou Equilibrista)
let perfilUsuario = null;

// Flag booleana que indica se o questionário já foi iniciado
let questionarioIniciado = false;

// ========== TELA DE BOAS-VINDAS ==========
// Função que cria e exibe a tela inicial onde o usuário insere seu nome
function mostrarTelaBoasVindas() {
    // Insere o HTML da tela de boas-vindas dentro do container de perguntas
    caixaPerguntas.innerHTML = `
        <div class="boas-vindas">
            <!-- Ícone decorativo da aplicação -->
            <div class="boas-vindas-icone">🤖</div>
            
            <!-- Título principal da tela inicial -->
            <h2>Bem-vindo ao Futuro da IA!</h2>
            
            <!-- Descrição do que o usuário irá fazer -->
            <p>Descubra sua visão sobre inteligência artificial através de 5 perguntas reflexivas.</p>
            
            <!-- Seção para entrada do nome do usuário -->
            <div class="entrada-nome">
                <label for="nome-input">Como você gostaria de ser chamado?</label>
                
                <!-- Campo de entrada de texto para o nome (máximo 30 caracteres) -->
                <input type="text" id="nome-input" placeholder="Digite seu nome..." maxlength="30">
                
                <!-- Botão para iniciar o questionário (começa desabilitado) -->
                <button id="btn-iniciar" disabled>🚀 Iniciar Questionário</button>
            </div>
            
            <!-- Seção que mostra os possíveis perfis que o usuário pode obter -->
            <div class="preview-perfis">
                <h3>Perfis Possíveis:</h3>
                <div class="perfis-grid">
                    <!-- Preview do perfil Guardião (para respostas cautelosas) -->
                    <div class="perfil-preview cauteloso">
                        <span class="perfil-emoji">🛡️</span>
                        <span class="perfil-nome">Guardião</span>
                    </div>
                    
                    <!-- Preview do perfil Equilibrista (para respostas mistas) -->
                    <div class="perfil-preview equilibrado">
                        <span class="perfil-emoji">⚖️</span>
                        <span class="perfil-nome">Equilibrista</span>
                    </div>
                    
                    <!-- Preview do perfil Pioneiro (para respostas progressistas) -->
                    <div class="perfil-preview progressista">
                        <span class="perfil-emoji">🚀</span>
                        <span class="perfil-nome">Pioneiro</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // ========== EVENT LISTENERS PARA ENTRADA DE NOME ==========
    // Seleciona o campo de entrada de nome e o botão iniciar após criação do HTML
    const nomeInput = document.getElementById("nome-input");
    const btnIniciar = document.getElementById("btn-iniciar");
    
    // Event listener que monitora mudanças no campo de entrada de nome
    nomeInput.addEventListener("input", (e) => {
        // Captura o valor digitado, removendo espaços nas extremidades
        nomeUsuario = e.target.value.trim();
        
        // Habilita/desabilita o botão baseado no comprimento do nome (mínimo 2 caracteres)
        btnIniciar.disabled = nomeUsuario.length < 2;
        
        // Ajusta visualmente a opacidade do botão quando desabilitado
        btnIniciar.style.opacity = nomeUsuario.length < 2 ? "0.5" : "1";
    });
    
    // Event listener para permitir iniciar com Enter se o nome for válido
    nomeInput.addEventListener("keypress", (e) => {
        // Verifica se Enter foi pressionado e se o nome tem pelo menos 2 caracteres
        if (e.key === "Enter" && nomeUsuario.length >= 2) {
            iniciarQuestionario(); // Chama a função para iniciar o questionário
        }
    });
    
    // Event listener para o clique no botão iniciar
    btnIniciar.addEventListener("click", iniciarQuestionario);
    
    // Foca automaticamente no campo de entrada após 500ms (permite animações CSS)
    setTimeout(() => nomeInput.focus(), 500);
}

// ========== INICIAR QUESTIONÁRIO ==========
// Função que faz a transição da tela de boas-vindas para o questionário
function iniciarQuestionario() {
    // Verifica se o nome tem pelo menos 2 caracteres antes de prosseguir
    if (nomeUsuario.length < 2) return;
    
    // Marca que o questionário foi iniciado (importante para controles)
    questionarioIniciado = true;
    
    // ========== ANIMAÇÃO DE TRANSIÇÃO SUAVE ==========
    // Aplica efeito de redução e transparência à tela de boas-vindas
    document.querySelector(".boas-vindas").style.transform = "scale(0.8)";
    document.querySelector(".boas-vindas").style.opacity = "0";
    
    // Aguarda 500ms para completar a animação antes de mostrar a primeira pergunta
    setTimeout(() => {
        caixaPerguntas.innerHTML = ""; // Limpa o conteúdo da tela de boas-vindas
        mostraPergunta(); // Chama a função que exibe a primeira pergunta
    }, 500);
    
    // Personaliza o título da página com o nome do usuário
    document.title = `${nomeUsuario} - Questionário IA`;
}

// ========== CRIAÇÃO DE ELEMENTOS DINÂMICOS ==========
function criarElementosInterface() {
    // Cria barra de progresso
    const barraProgresso = document.createElement("div");
    barraProgresso.className = "barra-progresso";
    barraProgresso.innerHTML = `
        <div class="progresso-container">
            <div class="progresso-barra" id="progresso"></div>
            <span class="progresso-texto">Pergunta <span id="atual-numero">1</span> de ${perguntas.length}</span>
        </div>
    `;
    
    // Cria área de botões de controle
    const controlesContainer = document.createElement("div");
    controlesContainer.className = "controles-container";
    controlesContainer.innerHTML = `
        <button id="btn-reiniciar" class="btn-controle" style="display: none;">🔄 Reiniciar Questionário</button>
        <button id="btn-historico" class="btn-controle" style="display: none;">📋 Ver Histórico</button>
        <button id="btn-compartilhar" class="btn-controle" style="display: none;">📤 Compartilhar Resultado</button>
        <button id="btn-certificado" class="btn-controle" style="display: none;">🏆 Baixar Certificado</button>
    `;
    
    // Insere elementos na página
    caixaPrincipal.insertBefore(barraProgresso, caixaPerguntas);
    caixaPrincipal.appendChild(controlesContainer);
}

// ========== EVENT LISTENERS AVANÇADOS ==========
function adicionarEventListeners() {
    // 🎯 EVENT LISTENER 1: Botão Reiniciar
    document.addEventListener("click", (evento) => {
        if (evento.target.id === "btn-reiniciar") {
            reiniciarQuestionario();
        }
    });
    
    // 🎯 EVENT LISTENER 2: Botão Histórico
    document.addEventListener("click", (evento) => {
        if (evento.target.id === "btn-historico") {
            mostrarHistorico();
        }
    });
    
    // 🎯 EVENT LISTENER 3: Botão Compartilhar
    document.addEventListener("click", (evento) => {
        if (evento.target.id === "btn-compartilhar") {
            compartilharResultado();
        }
    });
    
    // 🎯 EVENT LISTENER 4: Botão Certificado
    document.addEventListener("click", (evento) => {
        if (evento.target.id === "btn-certificado") {
            gerarCertificado();
        }
    });
    
    // 🎯 EVENT LISTENER 5: Navegação por Teclado com Efeitos Vermelhos
    document.addEventListener("keydown", (evento) => {
        if (atual < perguntas.length && questionarioIniciado) {
            if (evento.key === "1") {
                const botao1 = document.querySelector('[data-indice="0"]');
                if (botao1) {
                    console.log("🎹 Tecla 1 pressionada - ativando efeitos vermelhos!");
                    ativarEfeitosVermelhos(botao1, 0);
                }
            } else if (evento.key === "2") {
                const botao2 = document.querySelector('[data-indice="1"]');
                if (botao2) {
                    console.log("🎹 Tecla 2 pressionada - ativando efeitos vermelhos!");
                    ativarEfeitosVermelhos(botao2, 1);
                }
            } else if (evento.key === "Escape") {
                mostrarConfirmacaoSaida();
            } else if (evento.key === "r" || evento.key === "R") {
                // Bônus: Tecla R para reiniciar
                if (atual >= perguntas.length) {
                    reiniciarQuestionario();
                }
            }
        }
    });
    
    // 🎯 EVENT LISTENER 6: Detecção de redimensionamento
    window.addEventListener("resize", () => {
        ajustarLayoutResponsivo();
    });
    
    // 🎯 EVENT LISTENER 7: Antes de sair da página
    window.addEventListener("beforeunload", (evento) => {
        if (atual > 0 && atual < perguntas.length && questionarioIniciado) {
            evento.preventDefault();
            evento.returnValue = "Você tem certeza que deseja sair? Seu progresso será perdido.";
        }
    });
}

// ========== FUNÇÃO PRINCIPAL DE PERGUNTA ==========
// Função responsável por exibir cada pergunta do questionário
function mostraPergunta() {
    // Verifica se todas as perguntas foram respondidas
    if (atual >= perguntas.length) {
        mostraResultado(); // Se sim, mostra o resultado final
        return; // Sai da função
    }
    
    // Exibe a barra de progresso apenas a partir da primeira pergunta
    if (atual === 0 && questionarioIniciado) {
        document.querySelector(".barra-progresso").style.display = "block";
    }
    
    // Atualiza a barra de progresso com a pergunta atual
    atualizarProgresso();
    
    // ========== ANIMAÇÃO SUAVE PARA TRANSIÇÃO ==========
    // Primeiro faz a pergunta atual ficar transparente
    caixaPerguntas.style.opacity = "0";
    
    // Após 200ms, muda o conteúdo e torna visível novamente
    setTimeout(() => {
        caixaPerguntas.innerHTML = `
            <div class="pergunta-header">
                <!-- Mostra qual pergunta está sendo exibida -->
                <span class="pergunta-numero">Pergunta ${atual + 1} de ${perguntas.length}</span>
                
                <!-- Saudação personalizada com o nome do usuário -->
                <span class="usuario-nome">👋 Olá, ${nomeUsuario}!</span>
            </div>
            
            <!-- Texto da pergunta atual obtida do array 'perguntas' -->
            <div class="pergunta-texto">${perguntas[atual].enunciado}</div>
        `;
        
        // Torna a pergunta visível novamente após mudança do conteúdo
        caixaPerguntas.style.opacity = "1";
    }, 200);
    
    // Exibe os botões das alternativas para a pergunta atual
    mostraAlternativas();
    
    // Adiciona as dicas de navegação por teclado na parte inferior
    mostrarDicasTeclado();
}

// ========== FUNÇÃO DE ALTERNATIVAS MELHORADA COM EFEITOS VERMELHOS ==========
// Função que cria e exibe os botões das alternativas para a pergunta atual
function mostraAlternativas() {
    // Limpa qualquer conteúdo anterior do container de alternativas
    caixaAlternativas.innerHTML = "";
    
    // Loop que cria um botão para cada alternativa da pergunta atual
    for (let i = 0; i < perguntas[atual].alternativas.length; i++) {
        // Cria o elemento button para a alternativa
        const botaoAlternativa = document.createElement("button");
        
        // Define o texto do botão como o texto da alternativa
        botaoAlternativa.textContent = perguntas[atual].alternativas[i].texto;
        
        // Adiciona a classe CSS para estilização
        botaoAlternativa.className = "botao-alternativa";
        
        // Adiciona atributo data-indice para identificar qual botão foi clicado
        botaoAlternativa.setAttribute("data-indice", i);
        
        // ========== CRIAÇÃO DO INDICADOR DE TECLA ==========
        // Cria elemento span para mostrar o número da tecla (1, 2, etc.)
        const numeroTecla = document.createElement("span");
        numeroTecla.className = "numero-tecla";
        numeroTecla.textContent = i + 1; // Número da tecla correspondente
        
        // Adiciona o número da tecla no início do botão
        botaoAlternativa.prepend(numeroTecla);
        
        // ========== EVENT LISTENERS DOS BOTÕES ==========
        
        // 🔥 EVENT LISTENER PRINCIPAL: Clique no botão
        botaoAlternativa.addEventListener("click", (evento) => {
            evento.preventDefault(); // Previne comportamento padrão
            ativarEfeitosVermelhos(botaoAlternativa, i); // Ativa efeitos visuais e processa resposta
        });
        
        // 🎯 EVENT LISTENER: Início do clique (mousedown)
        botaoAlternativa.addEventListener("mousedown", () => {
            // Adiciona classe temporária para efeito visual durante o clique
            adicionarClasseTemporaria(botaoAlternativa, "botao-clicado", 300);
        });
        
        // 🎨 EVENT LISTENER: Quando o botão recebe foco (após clique ou navegação)
        botaoAlternativa.addEventListener("focus", () => {
            // Log para debug mostrando que o botão está com foco
            console.log(`Botão ${i + 1} está com foco - ficará vermelho!`);
        });
        
        // ✨ EVENT LISTENER: Hover - mouse entra no botão
        botaoAlternativa.addEventListener("mouseenter", () => {
            // Só aplica efeito se o botão não estiver selecionado
            if (!botaoAlternativa.classList.contains("botao-selecionado")) {
                // Efeito de elevação e leve aumento do botão
                botaoAlternativa.style.transform = "translateY(-5px) scale(1.02)";
            }
        });
        
        // ✨ EVENT LISTENER: Hover - mouse sai do botão
        botaoAlternativa.addEventListener("mouseleave", () => {
            // Só remove efeito se o botão não estiver selecionado
            if (!botaoAlternativa.classList.contains("botao-selecionado")) {
                // Retorna o botão ao estado normal
                botaoAlternativa.style.transform = "translateY(0) scale(1)";
            }
        });
        
        // Adiciona o botão criado ao container de alternativas
        caixaAlternativas.appendChild(botaoAlternativa);
    }
}

// ========== FUNÇÃO DE RESPOSTA MELHORADA ==========
// Função chamada quando o usuário seleciona uma alternativa
function respostaSelecionada(opcaoSelecionada) {
    // Obtém o objeto da alternativa selecionada (texto e tipo de personalidade)
    const respostaSelecionadaObj = perguntas[atual].alternativas[opcaoSelecionada];
    
    // ========== REGISTRO NO HISTÓRICO ==========
    // Adiciona a pergunta e resposta ao histórico final para exibição posterior
    historiaFinal.push({
        pergunta: perguntas[atual].enunciado,        // Texto da pergunta
        resposta: respostaSelecionadaObj.texto,      // Texto da resposta escolhida
        tipo: respostaSelecionadaObj.tipo            // Tipo de personalidade (cauteloso/progressista)
    });
    
    // ========== ATUALIZAÇÃO DA PONTUAÇÃO ==========
    // Incrementa o contador do tipo de personalidade correspondente
    pontuacao[respostaSelecionadaObj.tipo]++;
    
    // Adiciona o índice da resposta escolhida ao array de respostas
    respostas.push(opcaoSelecionada);
    
    // ========== CONTROLE DE FLUXO ==========
    // Avança para a próxima pergunta incrementando o índice atual
    atual++;
    
    // Chama a função para mostrar a próxima pergunta (ou resultado se acabaram as perguntas)
    mostraPergunta();
}

// ========== SISTEMA DE RESULTADO AVANÇADO ==========
// Função principal que exibe o resultado final do questionário
function mostraResultado() {
    // ========== ANÁLISE DE PERSONALIDADE ==========
    // Analisa as respostas e determina o perfil do usuário (Guardião/Pioneiro/Equilibrista)
    perfilUsuario = analisarPerfil();
    
    // ========== APLICAÇÃO DE TEMA VISUAL ==========
    // Muda as cores da interface baseado no perfil obtido
    aplicarTemaPersonalizado(perfilUsuario.tipo);
    
    // ========== LIMPEZA DA INTERFACE ==========
    // Remove todos os elementos relacionados às perguntas
    caixaPerguntas.textContent = "";              // Limpa área de perguntas
    caixaAlternativas.innerHTML = "";             // Limpa área de alternativas
    document.querySelector(".barra-progresso").style.display = "none"; // Oculta barra de progresso
    
    // ========== EFEITOS VISUAIS DE CELEBRAÇÃO ==========
    // Cria animação de confetti para celebrar a conclusão
    criarEfeitoConfetti();
    
    // ========== CRIAÇÃO DO CERTIFICADO DIGITAL ==========
    // Exibe o container de resultado e cria o certificado personalizado
    caixaResultado.style.display = "block";
    caixaResultado.innerHTML = `
        <div class="certificado-digital">
            <div class="certificado-header">
                <!-- Selo decorativo do certificado -->
                <div class="certificado-selo">🏆</div>
                
                <!-- Título principal do certificado -->
                <h2>Certificado de Personalidade IA</h2>
                <div class="certificado-data">${new Date().toLocaleDateString('pt-BR')}</div>
            </div>
            
            <div class="certificado-corpo">
                <div class="certificado-linha">Certificamos que</div>
                <div class="certificado-nome">${nomeUsuario}</div>
                <div class="certificado-linha">completou o questionário e foi classificado como</div>
                
                <div class="resultado-perfil-principal">
                    <div class="perfil-visual">
                        <div class="perfil-emoji-grande">${perfilUsuario.emoji}</div>
                        <div class="perfil-titulo-grande">${perfilUsuario.titulo}</div>
                    </div>
                    <div class="perfil-descricao-personalizada">
                        ${gerarDescricaoPersonalizada()}
                    </div>
                </div>
                
                <div class="resultado-estatisticas-visual">
                    <h3>Sua Análise Completa</h3>
                    <div class="stats-container">
                        <div class="stat-circular">
                            <div class="stat-circle cauteloso" style="--porcentagem: ${(pontuacao.cauteloso / perguntas.length) * 100}%">
                                <span class="stat-numero">${pontuacao.cauteloso}</span>
                                <span class="stat-label">Cauteloso</span>
                            </div>
                        </div>
                        <div class="stat-circular">
                            <div class="stat-circle progressista" style="--porcentagem: ${(pontuacao.progressista / perguntas.length) * 100}%">
                                <span class="stat-numero">${pontuacao.progressista}</span>
                                <span class="stat-label">Progressista</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="recomendacoes-personalizadas">
                    <h3>Recomendações para ${nomeUsuario}</h3>
                    <div class="recomendacoes-lista">
                        ${gerarRecomendacoes()}
                    </div>
                </div>
            </div>
            
            <div class="certificado-footer">
                <div class="assinatura">
                    <div class="assinatura-linha"></div>
                    <div class="assinatura-texto">Sistema de Análise IA</div>
                </div>
            </div>
        </div>
    `;
    
    // Mostra botões de controle
    mostrarBotoesControle();
    
    // Animação de entrada do resultado
    setTimeout(() => {
        caixaResultado.classList.add("resultado-animado");
    }, 100);
}

// ========== SISTEMA DE ANÁLISE DE PERFIL EXPANDIDO ==========
function analisarPerfil() {
    const totalCauteloso = pontuacao.cauteloso;
    const totalProgressista = pontuacao.progressista;
    
    if (totalCauteloso > totalProgressista) {
        return {
            emoji: "🛡️",
            titulo: "Guardião da IA Responsável",
            descricao: "Você prioriza a segurança e a ética no desenvolvimento da IA. Acredita que devemos proceder com cautela e garantir que a tecnologia beneficie toda a humanidade.",
            tipo: "cauteloso",
            cor: "#4CAF50"
        };
    } else if (totalProgressista > totalCauteloso) {
        return {
            emoji: "🚀",
            titulo: "Pioneiro da Inovação",
            descricao: "Você é um visionário que acredita no potencial transformador da IA. Está disposto a aceitar alguns riscos para acelerar o progresso tecnológico.",
            tipo: "progressista",
            cor: "#FF6B35"
        };
    } else {
        return {
            emoji: "⚖️",
            titulo: "Equilibrista Tecnológico",
            descricao: "Você busca o equilíbrio perfeito entre inovação e responsabilidade. Acredita que o futuro da IA requer tanto progresso quanto prudência.",
            tipo: "equilibrado",
            cor: "#9C27B0"
        };
    }
}

// ========== SISTEMA DE TEMAS DINÂMICOS ==========
function aplicarTemaPersonalizado(tipoPerfil) {
    document.body.className = `tema-${tipoPerfil}`;
    
    const temas = {
        cauteloso: {
            gradiente: "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)",
            acento: "#81C784"
        },
        progressista: {
            gradiente: "linear-gradient(135deg, #FF6B35 0%, #F44336 100%)",
            acento: "#FF8A65"
        },
        equilibrado: {
            gradiente: "linear-gradient(135deg, #9C27B0 0%, #673AB7 100%)",
            acento: "#BA68C8"
        }
    };
    
    const tema = temas[tipoPerfil];
    document.body.style.background = tema.gradiente;
    document.documentElement.style.setProperty('--cor-acento', tema.acento);
}

// ========== GERAÇÃO DE CONTEÚDO PERSONALIZADO ==========
function gerarDescricaoPersonalizada() {
    const descricoes = {
        cauteloso: [
            `${nomeUsuario}, sua abordagem cuidadosa mostra maturidade e responsabilidade.`,
            "Você valoriza a segurança e o bem-estar coletivo acima de ganhos rápidos.",
            "Sua visão ajuda a construir um futuro tecnológico mais seguro para todos."
        ],
        progressista: [
            `${nomeUsuario}, sua coragem para abraçar mudanças é inspiradora!`,
            "Você vê oportunidades onde outros veem riscos.",
            "Sua mentalidade pioneira impulsiona a humanidade para frente."
        ],
        equilibrado: [
            `${nomeUsuario}, sua capacidade de equilibrar é uma qualidade rara.`,
            "Você consegue ver tanto os benefícios quanto os riscos da tecnologia.",
            "Sua perspectiva balanceada é essencial para decisões sábias."
        ]
    };
    
    return descricoes[perfilUsuario.tipo].join(" ");
}

function gerarRecomendacoes() {
    const recomendacoes = {
        cauteloso: [
            "📚 Leia sobre ética em IA e participe de discussões sobre regulamentação",
            "🤝 Conecte-se com organizações que promovem IA responsável",
            "🔍 Mantenha-se informado sobre os impactos sociais da tecnologia"
        ],
        progressista: [
            "🚀 Explore novas tecnologias e mantenha-se na vanguarda da inovação",
            "💡 Participe de hackathons e projetos de desenvolvimento de IA",
            "🌐 Conecte-se com empreendedores e visionários da área tech"
        ],
        equilibrado: [
            "⚖️ Participe de debates equilibrados sobre o futuro da tecnologia",
            "🎓 Estude tanto os aspectos técnicos quanto éticos da IA",
            "🌍 Contribua para políticas públicas sobre tecnologia"
        ]
    };
    
    return recomendacoes[perfilUsuario.tipo].map(rec => `<div class="recomendacao-item">${rec}</div>`).join("");
}

// ========== EFEITOS VISUAIS ESPECIAIS ==========
function criarEfeitoConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.backgroundColor = ["#FFD700", "#FF6B35", "#4CAF50", "#2196F3", "#9C27B0"][Math.floor(Math.random() * 5)];
        confetti.style.animationDelay = Math.random() * 3 + "s";
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 4000);
    }
}

// ========== GERAÇÃO DE CERTIFICADO ==========
function gerarCertificado() {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    
    // Background do certificado
    ctx.fillStyle = perfilUsuario.cor;
    ctx.fillRect(0, 0, 800, 600);
    
    // Texto do certificado
    ctx.fillStyle = "white";
    ctx.font = "bold 36px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Certificado de Personalidade IA", 400, 100);
    
    ctx.font = "24px Arial";
    ctx.fillText(`${nomeUsuario}`, 400, 200);
    
    ctx.font = "20px Arial";
    ctx.fillText(`${perfilUsuario.titulo}`, 400, 300);
    
    ctx.fillText(`${new Date().toLocaleDateString('pt-BR')}`, 400, 500);
    
    // Download do certificado
    const link = document.createElement("a");
    link.download = `certificado-${nomeUsuario}-ia.png`;
    link.href = canvas.toDataURL();
    link.click();
    
    mostrarNotificacao("🏆 Certificado baixado com sucesso!");
}

// ========== FUNÇÕES DE CONTROLE ATUALIZADAS ==========
function reiniciarQuestionario() {
    atual = 0;
    respostas = [];
    historiaFinal = [];
    pontuacao = { cauteloso: 0, progressista: 0 };
    nomeUsuario = "";
    perfilUsuario = null;
    questionarioIniciado = false;
    
    // Remove tema personalizado
    document.body.className = "";
    document.body.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    
    caixaResultado.style.display = "none";
    document.querySelector(".barra-progresso").style.display = "none";
    document.querySelectorAll(".btn-controle").forEach(btn => btn.style.display = "none");
    
    // Volta para tela de boas-vindas
    mostrarTelaBoasVindas();
}

function mostrarHistorico() {
    const modal = criarModal("Histórico de Respostas", gerarHistoricoHTML());
    document.body.appendChild(modal);
}

function compartilharResultado() {
    const texto = `🤖 Olá! Sou ${nomeUsuario} e acabei de descobrir minha personalidade sobre IA: ${perfilUsuario.titulo} ${perfilUsuario.emoji}\n\n${perfilUsuario.descricao}\n\nFaça o teste você também e descubra seu perfil!`;
    
    if (navigator.share) {
        navigator.share({ 
            title: "Minha Personalidade IA", 
            text: texto,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(texto);
        mostrarNotificacao("Resultado copiado para a área de transferência! 📋");
    }
}

// ========== FUNÇÕES AUXILIARES ATUALIZADAS ==========
function atualizarProgresso() {
    const porcentagem = (atual / perguntas.length) * 100;
    const progressoElement = document.getElementById("progresso");
    if (progressoElement) {
        progressoElement.style.width = porcentagem + "%";
        document.getElementById("atual-numero").textContent = atual + 1;
    }
}

function mostrarBotoesControle() {
    document.querySelectorAll(".btn-controle").forEach(btn => {
        btn.style.display = "inline-block";
    });
}

// ========== 🔥 SISTEMA DE EFEITOS VERMELHOS PARA CLIQUES ==========
// Função principal que gerencia todos os efeitos visuais quando um botão é clicado
function ativarEfeitosVermelhos(botaoClicado, indice) {
    // Log para debug mostrando qual botão foi clicado
    console.log(`🔥 Botão ${indice + 1} clicado! Ativando efeitos vermelhos...`);
    
    // Remove qualquer seleção anterior de outros botões
    removerSelecaoAnterior();
    
    // Adiciona classe CSS que deixa o botão vermelho permanentemente
    botaoClicado.classList.add("botao-selecionado");
    
    // Adiciona marca de verificação (✓) no botão selecionado
    adicionarIndicadorSelecao(botaoClicado);
    
    // Deixa os outros botões com aparência desbotada/opaca
    marcarBotoesNaoSelecionados(indice);
    
    // Reproduz som de clique se o navegador suportar
    emitirSomClique();
    
    // Adiciona animação de explosão/pulsação temporária (600ms)
    adicionarClasseTemporaria(botaoClicado, "botao-clicado", 600);
    
    // Aguarda 800ms para processar a resposta (permite visualizar os efeitos)
    setTimeout(() => {
        processarResposta(indice); // Chama função que registra a resposta e avança
    }, 800);
}

// Função utilitária que adiciona uma classe CSS temporariamente
function adicionarClasseTemporaria(elemento, classe, duracao) {
    // Adiciona a classe ao elemento
    elemento.classList.add(classe);
    
    // Remove a classe após o tempo especificado (em milissegundos)
    setTimeout(() => {
        elemento.classList.remove(classe);
    }, duracao);
}

// Função que limpa todas as seleções visuais anteriores dos botões
function removerSelecaoAnterior() {
    // Encontra todos os botões que estavam selecionados
    const botoesSelecionados = document.querySelectorAll(".botao-selecionado");
    
    // Remove a classe de selecionado e indicadores visuais
    botoesSelecionados.forEach(botao => {
        botao.classList.remove("botao-selecionado");
        
        // Remove o ícone de verificação (✓) se existir
        const indicador = botao.querySelector(".indicador-selecao");
        if (indicador) {
            indicador.remove();
        }
    });
    
    // Remove o efeito de desbotamento dos botões não selecionados
    const botoesNaoSelecionados = document.querySelectorAll(".botao-nao-selecionado");
    botoesNaoSelecionados.forEach(botao => {
        botao.classList.remove("botao-nao-selecionado");
    });
}

function marcarBotoesNaoSelecionados(indiceSelecionado) {
    const botoes = document.querySelectorAll(".botao-alternativa");
    botoes.forEach((botao, index) => {
        if (index !== indiceSelecionado) {
            botao.classList.add("botao-nao-selecionado");
        }
    });
}

function adicionarIndicadorSelecao(botao) {
    // Remove indicador existente se houver
    const indicadorExistente = botao.querySelector(".indicador-selecao");
    if (indicadorExistente) {
        indicadorExistente.remove();
    }
    
    // Cria novo indicador
    const indicador = document.createElement("div");
    indicador.className = "indicador-selecao";
    indicador.innerHTML = "✓";
    botao.appendChild(indicador);
    
    // Animação de entrada do indicador
    indicador.style.transform = "scale(0)";
    setTimeout(() => {
        indicador.style.transform = "scale(1)";
    }, 100);
}

function emitirSomClique() {
    // Tenta reproduzir um som se o navegador suportar
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        console.log("Som não suportado neste navegador");
    }
}

function processarResposta(indice) {
    console.log(`✅ Processando resposta ${indice + 1}...`);
    respostaSelecionada(indice);
}

// Função original mantida para compatibilidade
function adicionarEfeitoClique(elemento) {
    elemento.style.transform = "scale(0.95)";
    elemento.style.filter = "brightness(1.2)";
}

function mostrarDicasTeclado() {
    const dicasExistentes = document.querySelector(".dicas-teclado");
    if (!dicasExistentes && questionarioIniciado) {
        const dicas = document.createElement("div");
        dicas.className = "dicas-teclado";
        dicas.innerHTML = "🎮 Teclas: <strong>1</strong> e <strong>2</strong> para selecionar • <strong>ESC</strong> para sair • <strong>R</strong> para reiniciar";
        caixaAlternativas.appendChild(dicas);
        
        // Adiciona efeito visual às dicas
        dicas.style.background = "linear-gradient(45deg, rgba(255, 68, 68, 0.2), rgba(255, 136, 136, 0.2))";
        dicas.style.border = "1px solid rgba(255, 68, 68, 0.4)";
        dicas.style.animation = "fadeIn 0.5s ease, pulsoSuave 3s infinite";
    }
}

function criarModal(titulo, conteudo) {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-conteudo">
            <span class="modal-fechar">&times;</span>
            <h3>${titulo}</h3>
            <div class="modal-corpo">${conteudo}</div>
        </div>
    `;
    
    modal.querySelector(".modal-fechar").addEventListener("click", () => {
        document.body.removeChild(modal);
    });
    
    return modal;
}

function gerarHistoricoHTML() {
    return historiaFinal.map((item, index) => `
        <div class="historico-item">
            <h4>Pergunta ${index + 1}</h4>
            <p class="historico-pergunta">${item.pergunta}</p>
            <p class="historico-resposta">✅ ${item.resposta}</p>
            <span class="historico-tipo">${item.tipo === 'cauteloso' ? '🛡️ Cauteloso' : '🚀 Progressista'}</span>
        </div>
    `).join("");
}

function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement("div");
    notificacao.className = "notificacao";
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        if (notificacao.parentNode) {
            document.body.removeChild(notificacao);
        }
    }, 3000);
}

function ajustarLayoutResponsivo() {
    const width = window.innerWidth;
    if (width < 768) {
        document.body.classList.add("mobile");
    } else {
        document.body.classList.remove("mobile");
    }
}

function mostrarConfirmacaoSaida() {
    if (confirm("Tem certeza que deseja sair? Seu progresso será perdido.")) {
        reiniciarQuestionario();
    }
}

// ========== INICIALIZAÇÃO ATUALIZADA ==========
// Event listener que executa quando toda a página HTML termina de carregar
document.addEventListener("DOMContentLoaded", () => {
    // Cria elementos da interface (barra de progresso, botões de controle, etc.)
    criarElementosInterface();
    
    // Adiciona todos os event listeners (teclado, cliques, etc.)
    adicionarEventListeners();
    
    // Mostra a tela inicial onde o usuário digita o nome
    mostrarTelaBoasVindas(); // Começa com tela de boas-vindas
    
    // Configura o layout responsivo baseado no tamanho da tela
    ajustarLayoutResponsivo();
});