
      const verde = document.getElementById('verde')
      const rojo = document.getElementById('rojo')
      const amarillo = document.getElementById('amarillo')
      const azul = document.getElementById('azul')
      const btnEmpezar = document.getElementById('btnEmpezar')
      //Level definition
      const ULTIMO_NIVEL = 3
      btnEmpezar.addEventListener('click', empezarJuego)
      
      class Juego {
        constructor() {
          this.inicializar = this.inicializar.bind(this)
          this.inicializar()
          this.generarSecuencia()
          setTimeout(this.siguienteNivel, 1000)
        }

        inicializar() {
          this.siguienteNivel = this.siguienteNivel.bind(this)
          this.elegirColor = this.elegirColor.bind(this)
          this.toggleBtnEmpezar()
          this.nivel = 1
          this. colores = {
            verde,
            rojo,
            amarillo,
            azul
          }
        }

        toggleBtnEmpezar(){
          if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
          }else{
            btnEmpezar.classList.add('hide')
          }
        }

        generarSecuencia(){
          this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4));
        }

        siguienteNivel(){
          this.subnivel = 0
          this.iluminarSecuencia()
          this.agregarEventosClick()
        }

        transformarNumeroAColor(numero){
          switch (numero){
            case 0:
              return 'verde'
            case 1:
              return 'rojo'
            case 2:
              return 'amarillo'
            case 3:
              return 'azul'
          }
        }

        transformarColorANumero(color){
          switch (color){
            case 'verde':
              return 0
            case 'rojo':
              return 1
            case 'amarillo':
              return 2
            case 'azul':
              return 3
          }
        }

        iluminarSecuencia(){
          for(let i = 0; i < this.nivel; i++){
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000*i)
          }
        }

        iluminarColor(color){
          this.colores[color].classList.add('light')
          setTimeout(() => this.apagarColor(color), 350)
        }

        apagarColor(color){
          this.colores[color].classList.remove('light')
        }

        agregarEventosClick(){
          this.colores.verde.addEventListener('click',this.elegirColor)
          this.colores.rojo.addEventListener('click',this.elegirColor)
          this.colores.amarillo.addEventListener('click',this.elegirColor)
          this.colores.azul.addEventListener('click',this.elegirColor)
        }

        eliminarEventosClick(){
          this.colores.verde.removeEventListener('click',this.elegirColor)
          this.colores.rojo.removeEventListener('click',this.elegirColor)
          this.colores.amarillo.removeEventListener('click',this.elegirColor)
          this.colores.azul.removeEventListener('click',this.elegirColor)
        }

        elegirColor(ev){
         const nombreColor = ev.target.dataset.color
         const numeroColor = this.transformarColorANumero(nombreColor)
         
         this.iluminarColor(nombreColor)
         if(numeroColor === this.secuencia[this.subnivel]){

          this.subnivel++
          if(this.subnivel==this.nivel){
              this.nivel++
              this.eliminarEventosClick()
              if(this.nivel ==(ULTIMO_NIVEL + 1)){
                  this.ganoElJuego()
              }else{
                  setTimeout(this.siguienteNivel,1500)
              }
          }

         }else{
             this.perdioElJuego()
         }
      }

          
        ganoElJuego(){
          swal("Bien","Felicidades, ganaste!!", "success")
          .then(this.inicializar)
        }

         perdioElJuego(){
          swal("Oops","Sigue intentando, tu puedes!","error")
          .then(() =>{
            this.eliminarEventosClick()
            this.inicializar()
          })
        }
      }

      function empezarJuego() {
        window.juego = new Juego()
      }
