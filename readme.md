## 1. Estrutura

### HTML
```html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calculadora Avancada</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/css/style.css" />
    <script src="/js/script.js" defer></script>
  </head>
  <body>
    <div class="grid-container">
      <div class="output">
        <div data-previous-operand class="previous-operand"></div>
        <div data-current-operand class="corrent-operand"></div>
      </div>
      <button data-all-clear class="span-two">AC</button>
      <button data-delete>DEL</button>
      <button data-operator class="operator">÷</button>
      <!-- data-number = atributo | ÷ = press Alt + 0247-->
      <button data-number>1</button>
      <button data-number>2</button>
      <button data-number>3</button>
      <button data-operator class="operator">*</button>
  
      <button data-number>4</button>
      <button data-number>5</button>
      <button data-number>6</button>
      <button data-operator class="operator">+</button>

      <button data-number>7</button>
      <button data-number>8</button>
      <button data-number>9</button>
      <button data-operator class="operator">-</button>

      <button data-number class="span-two">.</button>
      <button data-number>0</button>
      <button data-equals class="operator">=</button>
    </div>
  </body>
</html>
```
### CSS

```css
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Roboto", serif;
  font-weight: bold;
}

body {
  background: linear-gradient(to right, #233329, #41b883);
}

.grid-container {
  display: grid;
  justify-content: center;
  align-content: center;
  min-height: 100vh;
  grid-template-columns: repeat(4, 100px);
  grid-template-rows: minmax(120px, auto) repeat(5, 100px);
}

.grid-container button {
  cursor: pointer;
  font-size: 2rem;
  border: none;
  outline: none;
  background-color: #111;
  color: #eee;
}

.grid-container button:hover {
  background-color: #eee;
  color: #111;
}

.grid-container .operator {
  background-color: #41b875;
}

.span-two {
  grid-column: span 2;
}

.grid-container .output {
  grid-column: 1/-1;
  background-color: #222;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  padding: 10px;
  word-wrap: break-word;
  word-break: break-all;
}

.grid-container .output .previous-operand {
  color: rgba(255, 255, 255, 0.75);
  font-size: 1.5rem;
}

.grid-container .output .corrent-operand {
  color: #fff;
  font-size: 2.5rem;
}
```
### JAVASCRIPT

```js
const previousDysplay = document.querySelector("[data-previous-operand]");
const currentDysplay = document.querySelector("[data-current-operand]");
const equalsButton = document.querySelector("[data-equals]");

const deleteAll = document.querySelector("[data-all-clear]");
const deleteOne = document.querySelector("[data-delete]");

const DisplayNumber = document.querySelectorAll("[data-number]");
const DisplayOperation = document.querySelectorAll("[data-operator]");

DisplayNumber.forEach((dataNumber) => {
  dataNumber.addEventListener("click", () => {
    const number = dataNumber.innerHTML;
    if(currentDysplay.textContent.includes(".") && number == "."){
      return
    }else if (currentDysplay.textContent =="" && number == "."){
      currentDysplay.textContent = "0."
    }else{
      currentDysplay.textContent += number;
    }
  });
});

DisplayOperation.forEach((dataOperation) => {
  dataOperation.addEventListener("click", () => {
    const previous = previousDysplay.textContent.slice(0, -1);
    const current = currentDysplay.textContent;
    if (current == "") {
      return;
    } else {
      if (previous != "" && current != "") {
        resultOperation();
        const operation = dataOperation.innerHTML;
        previousDysplay.textContent = currentDysplay.textContent + operation;
        currentDysplay.textContent = "";
      } else {
        const operation = dataOperation.innerHTML;
        previousDysplay.textContent = currentDysplay.textContent + operation;
        currentDysplay.textContent = "";
      }
    }
  });
});

const resultOperation = () => {
  const previous = previousDysplay.textContent.slice(0, -1);
  const operator = previousDysplay.textContent.slice(-1);
  const current = currentDysplay.textContent;
  const _previous = parseFloat(previous);
  const _current = parseFloat(current);

  if (current == "") {
    return;
  } else {
    let result;
    switch (operator) {
      case "÷":
        result = _previous / _current;
        break;
      case "*":
        result = _previous * _current;
        break;
      case "+":
        result = _previous + _current;
        break;
      case "-":
        result = _previous - _current;
        break;
      default:
        result = "Invalid operator";
    }

    if (result !== "Invalid operator") {
      currentDysplay.textContent = result;
      previousDysplay.textContent = "";
    } else {
      return;
    }
  }
};

equalsButton.addEventListener("click", () => {
  resultOperation();
});

deleteAll.addEventListener("click", () => {
  currentDysplay.textContent = "";
  previousDysplay.textContent = "";
});

deleteOne.addEventListener("click", () => {
  currentDysplay.textContent = currentDysplay.textContent
    .toString()
    .slice(0, -1);
});
```
# Explicação detalhada do codigo

Esse código é uma calculadora avançada criada com **HTML**, **CSS**, e **JavaScript**. Vou detalhar o funcionamento de cada parte do código.

---

### **1. Estrutura HTML**

O HTML define a estrutura da interface da calculadora:

- **`<div class="grid-container">`**:
    
    - Este é o contêiner principal da calculadora. Ele utiliza um layout de grade (via CSS `display: grid`) para organizar os elementos (botões e visor) da calculadora.
- **`<div class="output">`**:
    
    - Área que exibe o valor atual (`current-operand`) e o valor anterior (`previous-operand`).
    - `data-previous-operand` e `data-current-operand` são atributos personalizados usados para facilitar a manipulação no JavaScript.
- **Botões da calculadora**:
    
    - Cada botão tem um atributo personalizado (`data-number`, `data-operator`, etc.), facilitando a identificação de sua funcionalidade no JavaScript.
    - Alguns botões possuem classes adicionais:
        - `span-two`: Faz com que o botão ocupe duas colunas (usando `grid-column: span 2` no CSS).
        - `operator`: Estiliza botões de operadores (ex.: `+`, `-`, `*`, `÷`).

---

### **2. Estilo CSS**

O CSS define o layout e o estilo visual da calculadora:

- **Body**:
    
    - Define um fundo com um gradiente (`linear-gradient`) e centraliza a calculadora usando `display: grid`.
- **Grid-container**:
    
    - Configura o layout da calculadora em uma grade, onde:
        - Cada botão ocupa um espaço de 100px por 100px.
        - O visor (área de `output`) ocupa toda a largura da grade (`grid-column: 1/-1`).
- **Estilo dos botões**:
    
    - Todos os botões têm um fundo escuro (`background-color: #111`) e texto claro.
    - `hover` e `active`: Alteram a cor do botão quando o usuário passa o mouse ou clica nele.
    - Botões com a classe `.operator` possuem uma cor de fundo específica (`#41b875`).
- **Estilo do visor (`.output`)**:
    
    - O visor é dividido em dois elementos:
        - `.previous-operand`: Exibe o valor anterior e o operador.
        - `.current-operand`: Exibe o número atual digitado.
    - Usa `display: flex` para alinhar o texto à direita e organizar os elementos verticalmente.

---

### **3. JavaScript**

O JavaScript controla a funcionalidade da calculadora. Aqui está a explicação de cada trecho:

#### **Declaração de constantes**

As constantes armazenam referências aos elementos HTML que serão manipulados:

- `previousDysplay` e `currentDysplay`: Referenciam os visores (`data-previous-operand` e `data-current-operand`).
- `equalsButton`, `deleteAll`, `deleteOne`: Referenciam os botões de igual, "AC" (limpar tudo) e "DEL" (apagar o último caractere), respectivamente.
- `DisplayNumber` e `DisplayOperation`: Referenciam todos os botões de números e operadores.

---

#### **Manipulação de números**

```javascript
DisplayNumber.forEach((dataNumber) => {
  dataNumber.addEventListener("click", () => {
    const number = dataNumber.innerHTML;
    if(currentDysplay.textContent.includes(".") && number == "."){
      return
    }else if (currentDysplay.textContent =="" && number == "."){
      currentDysplay.textContent = "0."
    }else{
      currentDysplay.textContent += number;
    }
  });
});
```

- Para cada botão de número (`data-number`):
    1. Captura o número clicado.
    2. Verifica:
        - Se o número é um ponto decimal (`.`) e já existe um ponto no número atual, o clique é ignorado.
        - Se o número atual está vazio e o usuário clicou em um ponto, adiciona `0.` como valor inicial.
    3. Adiciona o número ao final do texto exibido no visor atual.

---

#### **Manipulação de operadores**

```javascript
DisplayOperation.forEach((dataOperation) => {
  dataOperation.addEventListener("click", () => {
    const previous = previousDysplay.textContent.slice(0, -1);
    const current = currentDysplay.textContent;
    if (current == "") {
      return;
    } else {
      if (previous != "" && current != "") {
        resultOperation();
        const operation = dataOperation.innerHTML;
        previousDysplay.textContent = currentDysplay.textContent + operation;
        currentDysplay.textContent = "";
      } else {
        const operation = dataOperation.innerHTML;
        previousDysplay.textContent = currentDysplay.textContent + operation;
        currentDysplay.textContent = "";
      }
    }
  });
});
```

- Para cada botão de operador (`data-operator`):
    1. Verifica se há um número no visor atual (`currentDysplay`). Se estiver vazio, o operador não faz nada.
    2. Se há números no visor atual e no anterior:
        - Chama a função `resultOperation` para calcular o valor.
        - Atualiza o visor anterior (`previousDysplay`) com o número atual e o operador selecionado.
        - Limpa o visor atual (`currentDysplay`).
    3. Caso contrário, apenas transfere o número atual e o operador para o visor anterior.

---

#### **Função para calcular resultados**

```javascript
const resultOperation = () => {
  const previous = previousDysplay.textContent.slice(0, -1);
  const operator = previousDysplay.textContent.slice(-1);
  const current = currentDysplay.textContent;
  const _previous = parseFloat(previous);
  const _current = parseFloat(current);

  if (current == "") {
    return;
  } else {
    let result;
    switch (operator) {
      case "÷":
        result = _previous / _current;
        break;
      case "*":
        result = _previous * _current;
        break;
      case "+":
        result = _previous + _current;
        break;
      case "-":
        result = _previous - _current;
        break;
      default:
        result = "Invalid operator";
    }

    if (result !== "Invalid operator") {
      currentDysplay.textContent = result;
      previousDysplay.textContent = "";
    } else {
      return;
    }
  }
};
```

1. Extrai o valor anterior, o operador e o valor atual.
2. Converte os valores para números (`parseFloat`).
3. Usa um `switch` para determinar a operação a ser realizada (`+`, `-`, `*`, `÷`).
4. Exibe o resultado no visor atual (`currentDysplay`) e limpa o visor anterior.

---

#### **Função de limpar tudo**

```javascript
deleteAll.addEventListener("click", () => {
  currentDysplay.textContent = "";
  previousDysplay.textContent = "";
});
```

- Limpa os visores anterior e atual.

---

#### **Função de apagar o último caractere**

```javascript
deleteOne.addEventListener("click", () => {
  currentDysplay.textContent = currentDysplay.textContent
    .toString()
    .slice(0, -1);
});
```

- Remove o último caractere do visor atual (`currentDysplay`).

---

### **Resumo**

Este código implementa uma calculadora funcional com:

- **Operações básicas**: Soma, subtração, multiplicação e divisão.
- **Funcionalidades adicionais**: Apagar tudo (`AC`), apagar o último caractere (`DEL`), e ponto decimal (`.`).
- **Interface responsiva e moderna**: Usando CSS Grid e propriedades de estilo bem definidas.

---

## **Fluxo do Programa**

1. **Carregamento Inicial**:
    - O navegador carrega o **HTML**, que define a interface da calculadora.
    - O **CSS** é carregado para estilizar os elementos e criar o layout da grade da calculadora.
    - O **JavaScript** é carregado com o atributo `defer`, garantindo que o código seja executado após o carregamento completo do DOM.

---

2. **Renderização Visual**:
    - A calculadora é organizada em um layout de grade usando **CSS Grid**, com botões e visores posicionados adequadamente.
    - Elementos como botões, visores, e operadores são estilizados visualmente, com efeitos como `hover` para melhorar a interação do usuário.

---

3. **Eventos de Usuário**:
    - O usuário interage com a calculadora clicando em botões (números, operadores, limpar, igual, etc.).
    - Cada botão possui eventos associados (`click`), que desencadeiam funções específicas dependendo da ação realizada:
        - **Números**: São adicionados ao visor atual (`currentDysplay`).
        - **Operadores**: Transferem o número atual para o visor anterior (`previousDysplay`), junto com o operador, ou calculam o resultado se já houver um valor anterior.
        - **Igual (`=`)**: Calcula o resultado da operação.
        - **Limpar tudo (`AC`)**: Reseta os visores.
        - **Apagar (`DEL`)**: Remove o último caractere do visor atual.

---

4. **Execução das Operações**:
    - Quando o usuário pressiona um operador ou o botão de igual:
        1. O programa obtém o número anterior, o operador e o número atual.
        2. Converte os valores de texto (`string`) para números (`float`).
        3. Realiza a operação matemática correspondente.
        4. Atualiza os visores com o resultado ou limpa os valores, dependendo do contexto.

---

5. **Atualização Dinâmica do Visor**:
    - O visor é atualizado em tempo real à medida que o usuário interage com os botões.
    - Mensagens de erro ou validações (como impedir múltiplos pontos decimais) são tratadas no momento certo para evitar cálculos inválidos.

---

## **Pontos em Destaque**

Aqui estão os **principais aspectos** do código que merecem atenção:

### **1. Uso de Atributos Personalizados**

Os atributos personalizados (`data-*`) são usados para identificar elementos sem usar IDs ou classes adicionais. Por exemplo:

- `data-number` para os botões numéricos.
- `data-operator` para os operadores.
- `data-all-clear`, `data-delete`, `data-equals` para funções específicas.

Isso torna o código mais modular e organizado, pois é possível selecionar elementos diretamente pelo atributo no JavaScript.

---

### **2. Organização do Layout com CSS Grid**

- A **grade da calculadora** é organizada com:
    - `grid-template-columns`: Define colunas fixas (100px de largura).
    - `grid-template-rows`: Define uma linha maior para o visor e linhas iguais para os botões.
    - `grid-column: span 2`: Permite que botões ocupem duas colunas (ex.: o botão `AC` e o botão `.`).

Essa abordagem facilita o alinhamento preciso de botões e visores.

---

### **3. Modularidade no JavaScript**

O código JavaScript é bem modularizado:

- **Manipulação de números**:
    - Cada número é tratado com verificações (ex.: impedir múltiplos pontos decimais).
- **Operadores**:
    - A função `resultOperation` centraliza a lógica de cálculo, evitando repetição de código.
- **Eventos de clique**:
    - O uso de `forEach` para adicionar eventos aos botões mantém o código limpo e dinâmico.

---

### **4. Tratamento de Erros e Validações**

O programa contém algumas validações importantes, como:

- **Múltiplos pontos decimais**:
    - Impede que o usuário adicione mais de um ponto decimal ao número atual.
- **Valores vazios**:
    - Ignora cliques em operadores se o número atual estiver vazio.
- **Divisão por zero**:
    - Embora não tratado explicitamente, a operação retorna `Infinity`, que pode ser melhorada para exibir mensagens mais amigáveis ao usuário.

---

### **5. Estilo Responsivo e Intuitivo**

- A interface é responsiva, pois a grade ajusta os elementos automaticamente.
- A interação com os botões (ex.: `hover` para mudar as cores) melhora a usabilidade.

---

### **6. Função Central de Cálculo**

A função `resultOperation` concentra a lógica para realizar as operações matemáticas:

- Obtém os valores anteriores e atuais.
- Identifica o operador.
- Usa um `switch` para realizar a operação correspondente.
- Atualiza o visor com o resultado ou limpa os valores.

Isso evita duplicação de código e facilita a manutenção.

---

### **7. Funcionalidades Extras**

Além de operações básicas, a calculadora inclui:

- **Botão AC (All Clear)**:
    - Limpa os visores.
- **Botão DEL (Delete)**:
    - Remove o último caractere do número atual.
- **Ponto Decimal**:
    - Adiciona números decimais com validação.

---

## **Melhorias Potenciais**

Apesar do código ser funcional, aqui estão algumas sugestões de melhoria:

1. **Tratamento de Erros**:
    
    - Adicionar mensagens amigáveis para erros comuns (ex.: divisão por zero).
    - Exibir alertas ou indicadores visuais no visor para valores inválidos.
2. **Responsividade Completa**:
    
    - Adaptar o tamanho dos botões e visores para telas menores (usando media queries no CSS).
3. **Refatoração para Melhor Legibilidade**:
    
    - Renomear algumas variáveis para seguir um padrão consistente (ex.: `currentDysplay` para `currentDisplay`).
4. **Funções Mais Genéricas**:
    
    - Agrupar funções repetitivas (ex.: limpar valores, atualizar visores) em métodos reutilizáveis.

---

## **Resumo do Fluxo**

1. **Carregamento**: HTML, CSS e JavaScript são carregados.
2. **Renderização**: A calculadora é exibida na tela com layout definido por CSS Grid.
3. **Interação**:
    - Usuário clica nos botões e aciona eventos de números, operadores ou ações (limpar, apagar, etc.).
    - O JavaScript interpreta os eventos e atualiza os visores dinamicamente.
4. **Execução de Operações**:
    - Os valores e operadores são processados.
    - O resultado é exibido no visor.

### **Pontos em Destaque**:

- Uso de **CSS Grid** para layout.
- **Atributos personalizados (`data-*`)** para manipulação eficiente no JavaScript.
- Validações importantes, como evitar múltiplos pontos decimais e números inválidos.

Se precisar de mais informações ou de ajuda com melhorias, posso ajudar! 😊
