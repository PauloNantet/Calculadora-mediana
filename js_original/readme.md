# **JavaScript Original**

---

### **1. Declaração e Seleção de Elementos do DOM**
```javascript
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButtons = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);
```

- Esses trechos selecionam elementos do **DOM** (Document Object Model) usando `querySelector` e `querySelectorAll`, com base em atributos personalizados (`data-*`).
  - `numberButtons`: Seleciona todos os botões que representam números (ex.: 1, 2, 3, etc.).
  - `operationButtons`: Seleciona todos os botões que representam operadores (ex.: `+`, `-`, `÷`, `*`).
  - `equalsButton`: Seleciona o botão que calcula o resultado (`=`).
  - `deleteButtons`: Seleciona o botão que apaga o último número (`DEL`).
  - `allClearButton`: Seleciona o botão que reseta a calculadora (`AC`).
  - `previousOperandTextElement`: Seleciona o elemento que exibe o operando anterior (parte superior do visor).
  - `currentOperandTextElement`: Seleciona o elemento que exibe o operando atual (parte inferior do visor).

---

### **2. Criação da Classe `Calculator`**
```javascript
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
```

- A classe `Calculator` é criada para encapsular a lógica da calculadora.
- O **construtor** (`constructor`) recebe os elementos `previousOperandTextElement` e `currentOperandTextElement` e os armazena como propriedades da instância da classe. 
- A função `clear` é chamada no momento da inicialização para zerar os valores.

---

### **3. Formatação de Números para Exibição**
```javascript
  formateDisplayNumber(number) {
    const stringNumber = number.toString();

    const intergerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let intergerDisplay;

    if (isNaN(intergerDigits)) {
      intergerDisplay = "";
    } else {
      intergerDisplay = intergerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${intergerDisplay}.${decimalDigits}`;
    } else {
      return intergerDisplay;
    }
  }
```

- Essa função formata números para exibição no visor da calculadora:
  - Converte o número em `string`.
  - Separa a parte inteira e decimal.
  - Formata a parte inteira para incluir separadores de milhares (ex.: `1,000`).
  - Retorna o número formatado (com ou sem parte decimal).

---

### **4. Função de Deleção**
```javascript
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
```

- Remove o último caractere do número atual (`currentOperand`).
- Exemplo: Se o número atual for `123`, após deletar será `12`.

---

### **5. Cálculo do Resultado**
```javascript
  calculate() {
    let result;

    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

    switch (this.operation) {
      case "+":
        result = _previousOperand + _currentOperand;
        break;
      case "-":
        result = _previousOperand - _currentOperand;
        break;
      case "÷":
        result = _previousOperand / _currentOperand;
        break;
      case "*":
        result = _previousOperand * _currentOperand;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }
```

- Essa função realiza o cálculo baseado no operador armazenado (`+`, `-`, `÷`, `*`).
- Verifica se os operandos anteriores e atuais são números válidos. Se não forem, a função retorna.
- Usa um `switch` para determinar qual operação será executada.
- O resultado é armazenado em `this.currentOperand`, e os outros valores são resetados.

---

### **6. Escolha de Operação**
```javascript
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.calculate();
    }

    this.operation = operation;

    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
```

- Define qual operador será usado na próxima operação (ex.: `+`, `-`, `÷`, `*`).
- Se já houver um operando anterior, realiza o cálculo antes de definir o novo operador.

---

### **7. Adicionar Número**
```javascript
  appendNumber(number) {
    if (this.currentOperand.includes(".") && number == ".") return;

    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }
```

- Adiciona um número ao final do número atual.
- Impede que o usuário insira mais de um ponto decimal (`.`).

---

### **8. Limpar Dados**
```javascript
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
```

- Reseta os valores da calculadora, apagando os operandos e a operação.

---

### **9. Atualizar Visor**
```javascript
  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formateDisplayNumber(
      this.previousOperand
    )}${this.operation || ""}`;
    this.currentOperandTextElement.innerText = this.formateDisplayNumber(
      this.currentOperand
    );
  }
```

- Atualiza os elementos HTML (`innerText`) que exibem os valores atuais e anteriores no visor.

---

### **10. Instância da Calculadora**
```javascript
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);
```

- Cria uma instância da classe `Calculator`, associando os elementos do DOM que representam o visor anterior e o atual.

---

### **11. Eventos para Botões**
```javascript
for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}

for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

deleteButtons.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
```

- **Número**: Adiciona um evento de clique para os botões de número.
  - Chama `appendNumber` para adicionar o número e `updateDisplay` para atualizar o visor.
- **Operação**: Adiciona um evento de clique para os botões de operadores.
  - Chama `chooseOperation` para definir o operador.
- **AC**: Reseta a calculadora (`clear`).
- **=**: Realiza o cálculo (`calculate`).
- **DEL**: Apaga o último caractere do número atual (`delete`).

---

### **Resumo**
Esse código é uma implementação funcional de uma calculadora interativa:
1. **HTML** para a estrutura.
2. **CSS** para a aparência.
3. **JavaScript** para a lógica e interatividade.

A classe `Calculator` encapsula todas as funcionalidades, tornando o código reutilizável e organizado. A interação é gerenciada com eventos que acionam métodos específicos da calculadora.