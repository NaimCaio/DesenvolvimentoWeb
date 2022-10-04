var circles = {
    
    father: null,
    
    
    init: function() {
        
        this.father  = document.createElement("div")
        this.father.id="circles"
        this.father.className = (this.father.className ? this.father.className + ' ' : '') + 'circles';
        document.body.appendChild(this.father)
        
        if (null === this.father) {
            
            return;
        }
        
        
        var tittle = document.createElement("title")

        tittle.innerText = "Javascript - Hide Circles"
        document.head.appendChild(tittle)

        this.inportStyles()
        

        
        
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
        `

        var styleSheet = document.createElement("style")
        styleSheet.innerText = styles
        document.head.appendChild(styleSheet)
    },
    createCircle: function(id) {
        var circle = document.createElement("div")
        circle.id=(id)
        circle.className="circle"
        circle.onclick = function(){
            document.getElementById(id).style.display = "none";
        }
        this.father.appendChild(circle)
    }
}