const perguntas = [
    {
      pergunta: "Qual é a palavra-chave usada para declarar uma variável em JavaScript?",
      respostas: [
        "var",
        "let",
        "const"
      ],
      correta: 1 // A resposta correta é a opção "let"
    },
    {
      pergunta: "Qual é o método que pode ser usado para adicionar um elemento ao final de um array em JavaScript?",
      respostas: [
        "push()",
        "add()",
        "append()"
      ],
      correta: 0 // A resposta correta é a opção "push()"
    },
    {
      pergunta: "Qual é a maneira correta de escrever um comentário de uma linha em JavaScript?",
      respostas: [
        "// Este é um comentário de uma linha",
        "/* Este é um comentário de uma linha */",
        "<!-- Este é um comentário de uma linha -->"
      ],
      correta: 0 // A resposta correta é a opção "// Este é um comentário de uma linha"
    }
  ];
  
  // pegando o template do html
  const corretas = new Set()
  const quiz = document.querySelector('#quiz')
  const template = document.querySelector('template')
  const qtdPerguntas = perguntas.length
  const mostrarTotal = document.querySelector('#acertos span')
  mostrarTotal.textContent = corretas.size + ' de ' + qtdPerguntas
  
  for(const item of perguntas) {
    // diretamente a variável "template" sem precisar criar outra variável, porém
    // clonar o conteúdo em outra variável torna o código melhor legível
    const quizItem = template.content.cloneNode(true)
  
    // substituindo o conteúdo formatado em "h3" pelo conteúdo de "item.pergunta"
    quizItem.querySelector('h3').textContent = item.pergunta
    
    // Percorrendo "item.respostas"
    for(let resposta of item.respostas) {
      // armazena o conteúdo do nó "dt" na variável dt
      const dt = quizItem.querySelector('dl dt').cloneNode(true)
  
      // Substituindo o conteúdo dentro do nó "span" pelo conteúdo de "resposta"
      dt.querySelector('span').textContent = resposta
  
      // Na linha: <input type="radio" name="item" value="0"> estamos substituindo 
      // o valor de "name", que é "item" neste caso, por "pergunta-X", sendo X o valor
      // do indice atual deste 'for'.
      dt.querySelector('input').setAttribute('name', 'pergunta-' + perguntas.indexOf(item))
  
      // No HTML, a linha <input type="radio" name="item" value="0"> vai ter o valor
      // de "value" modificado de acordo com o index deste 'for', estando os valores
      // em um range de 0 à 2 (no meu caso).
      dt.querySelector('input').value = item.respostas.indexOf(resposta)
  
      // atribui uma função de callback ao 'onchange' do elemento 'input'.
      // o evento 'onchange' acontece quando clicamos no índice, então seu valor
      // é alterado, isso pode ser usado para entrada de texto também.
      dt.querySelector('input').onchange = (event) => {
        const estaCorreta = event.target.value == item.correta
  
        // if ternário em JS: condicao ? expressao_se_verdadeiro : expressao_se_falso;
        estaCorreta ? corretas.add(item) : corretas.delete(item);
  
        // substitui o texto que mostra a quantidade de acertos atual
        mostrarTotal.textContent = corretas.size + ' de ' + qtdPerguntas
      }
  
      // adiciona "dt" como mais um "filho" do nó "dl"
      quizItem.querySelector('dl').appendChild(dt)
    }
  
    // Remove "Resposta A" da tela, que é o conteúdo do "dt" que estava logo após
    // "dl" e foi removido.
    quizItem.querySelector('dl dt').remove()
  
    // exibe a pergunta na tela
    quiz.appendChild(quizItem)
}