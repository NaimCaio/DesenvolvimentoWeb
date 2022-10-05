var circles = {
    
    father: null,
    container:null,
    
    
    init: function() {

        this.container  = document.createElement("div")
        this.container.id="cont"
        this.container.className= "container"
        document.body.appendChild(this.container)

        this.father  = document.createElement("div")
        this.father.id="circles"
        this.father.className = (this.father.className ? this.father.className + ' ' : '') + 'row circles';
        this.container.appendChild(this.father)
        
        if (null === this.father) {
            
            return;
        }
        
        
        var tittle = document.createElement("title")

        tittle.innerText = "Javascript - Hide Circles"
        document.head.appendChild(tittle)

        this.inportStyles()
        

        
        
        this.initGame()


        this.reloadButton()
        this.addRedButton()
        this.addYellowButton()
        this.addBlueButton()
    },
    initGame(){

        this.createCircle("red-circle")
        this.createCircle("blue-circle")
        this.createCircle("yellow-circle")
    },

    inportStyles(){
        var styles = `
        .circle {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            float: left;
            margin-right: 50px;
        }
        #red-circle {
            background-color: red;
        }
        #blue-circle {
            background-color: blue;
        }
        #yellow-circle {
            background-color: yellow;
        }
        .row{
            display:flex
        }
        `

        var styleSheet = document.createElement("style")
        styleSheet.innerText = styles
        styleSheet.id="styles"
        document.head.appendChild(styleSheet)
    },
    createCircle: function(id) {
        var self=this;
        var circle = document.createElement("div")
        circle.id=(id)
        circle.className="circle"
        circle.onclick = function(){
            self.father.removeChild(circle)
            self.recalculate()

        }
        this.father.appendChild(circle)
    },
    reloadButton: function() {
        var div = document.createElement("div")
        div.id= "botoes"
        div.className= "row"
        this.container.appendChild(div)
        var button = document.createElement("button")
        button.id=("Recarregar")
        button.className="row reloadButton"
        button.innerText="Recarregar Inicio"
        var self =this
        button.onclick = function(){
            self.father.querySelectorAll(".circle").forEach(e=>{
                self.father.removeChild(e)
            })
            self.initGame()
            self.recalculate()
        }
        var buttonClass = `.reloadButton {
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            margin-top:10px;
          }`
        var styles= document.getElementById("styles")
        styles.innerText += buttonClass

        button.setAttribute("style", "background-color: #4CAF50;" )
        
        div.appendChild(button)
        
        
    },
    addRedButton: function() {
        var div = document.getElementById("botoes")
        var button = document.createElement("button")
        button.id=("redButton")
        button.className="row reloadButton"
        var vermelhos = document.querySelectorAll("#red-circle")
        button.innerText="Add Vermelhos: " + vermelhos.length
        
        var self = this;
        button.onclick = function(){
            self.createCircle("red-circle")
            var vermelhos= document.querySelectorAll("#red-circle").length
            button.innerText="Add Vermelhos: " + vermelhos
        }
        button.setAttribute("style", "background-color: red;" )
        div.appendChild(button)
    },
    addYellowButton: function() {
        var div = document.getElementById("botoes")
        var button = document.createElement("button")
        button.id=("yellowButton")
        button.className="row reloadButton"
        var amarelos = document.querySelectorAll("#yellow-circle")
        button.innerText="Add amarelos: " + amarelos.length
        
        var self = this;
        button.onclick = function(){
            self.createCircle("yellow-circle")
            var amarelos= document.querySelectorAll("#yellow-circle").length
            button.innerText="Add Amarelos: " + amarelos
        }
        button.setAttribute("style", "background-color: #EACF07;" )
        div.appendChild(button)
    },
    addBlueButton: function() {
        var div = document.getElementById("botoes")
        var button = document.createElement("button")
        button.id=("blueButton")
        button.className="row reloadButton"
        var azuis = document.querySelectorAll("#blue-circle")
        button.innerText="Add Azuis: " + azuis.length
        
        var self = this;
        button.onclick = function(){
            self.createCircle("blue-circle")
            var azuis= document.querySelectorAll("#blue-circle").length
            button.innerText="Add Azuis: " + azuis
        }
        button.setAttribute("style", "background-color: blue;" )
        div.appendChild(button)
    },
    recalculate:function(){
        var vermelhos= document.querySelectorAll("#red-circle").length
        var amarelos= document.querySelectorAll("#yellow-circle").length
        var azuis= document.querySelectorAll("#blue-circle").length
        document.getElementById("redButton").innerText="Add Vermelhos: " + vermelhos
        document.getElementById("blueButton").innerText="Add Azuis: " + azuis
        document.getElementById("yellowButton").innerText="Add Amarelos: " + amarelos
    }
}