AFRAME.registerComponent("create-markers", {
  
  //Add Code Here!
  init: async function(){
    var mainScene = document.querySelector("#main-scene")
    var dishes = await this.getDishes()
    dishes.map(dish=>{
      var marker= document.createElement('a-marker')
      marker.setAttribute("id",dish.id)
      marker.setAttribute("type","pattern")
      marker.setAttribute("url",dish.marker_pattern_url)
      marker.setAttribute("cursor",{
        rayOrigin:"mouse"
      })

      marker.setAttribute("markerhandler",{})
      mainScene.appendChild(marker)
    })
     var model = document.createElement("a-entity")
     model.setAttribute('id',`model-${dish.id}`)
     model.setAttribute("position",dish.model_geometry.position)
     model.setAttribute("rotation",dish.model_geometry.roatation)
     model.setAttribute("scale",dish.model_geometry.scale)
     model.setAttribute('gltf-model',`url(${dish.model_url})`)
     model.setAttribute("gesture-handler",{})
     marker.appendChild(model)

     var mainPlane= document.createElement('a-plane')
     mainPlane.setAttribute('id'`main-plane-${dish.id}`)
     mainPlane.setAttribute("position",{x:0,y:0,z:0})
     mainPlane.setAttribute("rotation",{x:-90,y:0,z:0})
     mainPlane.setAttribute("width",1.8)
     mainPlane.setAttribute("height",1.8)
     marker.appendChild(mainPlane)

     var titlePlane = document.createElement('a-plane')
     titlePlane.setAttribute('id'`title-plane-${dish.id}`)
     titlePlane.setAttribute("position",{x:0,y:0.9,z:0.02})
     titlePlane.setAttribute("rotation",{x:0,y:0,z:0})
     titlePlane.setAttribute("width",1.6)
     titlePlane.setAttribute("height",0.4)
     titlePlane.setAttribute('material',{color:'gray'})
     mainPlane.appendChild(titlePlane)
     
     var dishTitle = document.createElement("a-entity")
     dishTitle.setAttribute('id',`dish-title-${dish.id}`)
     dishTitle.setAttribute("position",{x:0,y:0,z:0})
     dishTitle.setAttribute("rotation",{x:0,y:0,z:0})
     dishTitle.setAttribute('text',{
       font:"monoid",
       color:"black",
       width:1.8,
       heigth:1,
       align:'center',
       value: dish.Dish-Name.toUpperCasse()
     })
     titlePlane.appendChild(dishTitle)

     var ingredients = document.createElement("a-entity")
     ingredients.setAttribute('id',`ingredients-${dish.id}`)
     ingredients.setAttribute("position",{x:0,y:0,z:0})
     ingredients.setAttribute("rotation",{x:0,y:0,z:0})
     ingredients.setAttribute('text',{
       font:"monoid",
       color:"black",
       width:1.8,
       heigth:1,
       align:'center',
       value: dish.Dish-Name.join("\n\n")
     })
 mainPlane.appendChild(ingredients)
  },
  getDishes: async function(){
    return await firebase
    .firestore()
    .collection("Dishes")
    .get()
    .then(snap=>{
      return snap.docs.map(doc=>doc.data())
    })
  }  
  });
