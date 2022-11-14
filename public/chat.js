const socket=io();

let mensaje= document.getElementById('mensaje');
let usuario= document.getElementById('usuario');
let boton= document.getElementById('enviar');
let salida= document.getElementById('salida');
let escribiendo= document.getElementById('escribiendo');

boton.addEventListener('click', function(){
    socket.emit('chat:mensaje',{
        mensaje: mensaje.value,
        usuario: usuario.value
    });
});

mensaje.addEventListener('keypress', function(){
    socket.emit('chat:escribiendo',usuario.value)
});

socket.on('chat:mensaje', function(data){
    escribiendo.innerHTML='';
    salida.innerHTML+=`<p>
    ${data.usuario}:${data.mensaje}
    </p>`
});

socket.on('chat:escribiendo', function(data){
    escribiendo.innerHTML= `<p>
    ${data} está escribiendo
    </p>`
});

