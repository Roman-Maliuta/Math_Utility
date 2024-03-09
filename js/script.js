function TestMath(testMathNew) {
    this.testMathNew = testMathNew;
    this.inputFile = this.testMathNew.querySelector('.field-file');
    this.labelFile = this.testMathNew.querySelector('.text-label');
    this.pFail = this.testMathNew.querySelector('.message-fail');
    this.btnAddFile = this.testMathNew.querySelector('.add-file');
    this.result = document.getElementById('result'); 
   
    this.inputFile.onchange = (e) => {
        if (this.inputFile.files.length >= 1) {
            this.labelFile.innerText = 'File has been selected';
            this.btnAddFile.disabled = false;
        }
    };
    this.btnAddFile.addEventListener('click', ()=> {
        if (this.inputFile.value !== '' && this.validFile(this.inputFile.files[0].type)) {
            this.getAnalysis(this.inputFile);
        } else {
            this.pFail.classList.remove('hide');
        }
    });
    this.validFile = function (typeValue) {
        let end = typeValue.indexOf('/');
        let type = typeValue.slice(0, end);
        if (type === 'text') {
            return true;
        }
    };
    this.removeOldRes = function () {
        do {
            this.result.children [0].remove();
        } while (this.result.children.length > 0)
    }

    this.getAnalysis = function (file) {   
        if (this.result.children.length > 0) {
            this.removeOldRes();
        }
        let reader = new FileReader();
        reader.readAsText(file.files[0]);

        reader.onload = function () {
            let array = [];
            array = reader.result.split("\n");
        let arrayTwo = [];
        for (let i = 0; i < array.length; i++) {
            let end = array[i].indexOf('/');
            array[i].slice(0, end);
            arrayTwo[arrayTwo.length]= +(array[i])           
            };
 
           getMax(arrayTwo)
           getMin(arrayTwo)
           getMediana(arrayTwo)
           getAverage(arrayTwo)
        };

        function getMax(source) {
         let max = source[0];
         for (let i = 0; i < source.length; i++) {
         if (max < source[i]) {
          max = source[i];
         };
         };
            
          const pMax = document.createElement('p');
          pMax.innerText = `1. Max number is: ${max}`; 
          this.result.append(pMax);
         return max;
        }
 
        function getMin(source) {
         let min = source[0];
         for (let i = 0; i < source.length; i++) {
         if (min > source[i]) {
          min = source[i];
         };
         };
            
          const pMin = document.createElement('p');
          pMin.innerText = `2. Min number is: ${min}`; 
          this.result.append(pMin);          
         return min;
        }
        
        function getMediana(source) {
          let testTwo = source;
          let mediana;  
          testTwo.sort((a, b) =>  a - b);
          if (testTwo.lenght % 2 !== 0) {
           mediana  = testTwo[Math.ceil(testTwo.length / 2)];
          } else {
           mediana  = (testTwo[testTwo.length / 2] + 
          testTwo[testTwo.length / 2 - 1]) / 2;
          };
            
          const pMediana = document.createElement('p');
          pMediana.innerText = `3. Mediana  is: ${mediana}`; 
          this.result.append(pMediana); 
         return mediana;
        };
        
        function getAverage(source) {
         let sum = 0;
         for (let i = 0; i < source.length; i++) {
          sum += source[i];
          };
            
          let average = sum / source.length;
          const pAverage = document.createElement('p');
          pAverage.innerText = `4. Average number is: ${average}`; 
          this.result.append(pAverage);  
          return average ;  
        };

        this.pFail.classList.add('hide');
        this.inputFile.value = '';
        this.labelFile.innerText = 'Choose a file';
        this.btnAddFile.disabled = true;
    };
} 

const testMath = new TestMath(document.getElementById('test-analysis'));