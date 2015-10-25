/*
 * Merlin's Potions 
 * Enext 2015
 * Main JS 
 * By: Dyessica Marques
 */
function Merlin() {

  var bb = bootbox,
    alt = alertify;

  /*
   * Método Publico init()
   * Inicia todas as configurações e funções do site Merlin. 
   */
  this.init = function() {
    set_data_rodape();
    jQueryButtons();
  }

  /*
   * Método Privado jQueryButtons()
   * Responsável por inicializar todos os botões.
   */
  var jQueryButtons = function() {
    $("#enviar_email").click(function() {
      enviar_email();
    });
    $(".produto").click(function() {
      lightbox_produto($(this).data("produto"));
    });
  }

  /*
   * Método Privado set_data_rodape()
   * Coloca o ano atual no rodapé
   */
  var set_data_rodape = function() {
    var data = new Date(),
      ano_atual;
    ano_atual = data.getFullYear();
    $('#data').html(ano_atual);
  }

  /*
   * Método Privado enviar_email()
   * Faz a validação do email "e envia o email"
   */
  var enviar_email = function() {
    var email = $("#email");
    if (email.val() === "") {
      alt.alert("Ops!", "Please, fill out the email and try again.");
    } else {
      alt.alert("Success!", "Email registered successfully.");
      email.val("");
    }
  }

  /*
   * Método Privado light_produto(id_produto) 
   * Mostra os dados do produto
   * @params id_produto number
   */
  var lightbox_produto = function(id_produto) {
    var produto = id_produto.toString(),
      ingredients = "";
      
    $.getJSON("js/potions.json", function(data) {
      for (var i = 0; i <= data["potions"][produto].ingredients.length; i++) {
        if (data["potions"][produto].ingredients[i] !== undefined) {
          ingredients += data["potions"][produto].ingredients[i] + "<br>";
        }
      };      
      bb.dialog({
        title: data["potions"][produto].name,
        message: '<div id="lightbox-content">' +
          '<div id="lightbox-picture">' +
          '<img src="img/' + data["potions"][produto].image + '">' +
          '</div>' +
          '<div id="lightbox-description"><b>Use/Effect</b><br> <br>' +
          data["potions"][produto].effect +
          '<br><br><b>Ingredients </b><br>' +
          '<br>' + ingredients +
          '<br><div> <b> Price</b></div> <span class="preco">$' +
          data["potions"][produto].price + '</span>' +
          '</div>' +
          '<div class="botao-modal">' +
          '<br> <br> <button class="botao" id="add" onclick="add_product()"> ADD TO CART </button>' +
          '</div>' +
          '</div>' +
          '<style> .modal-content { width: 785px; } </style>'
      });
    });

  }
}
/*
 * Funções extras
 * Função para simular adição de produto na bag.
 */
var add_product = function() {
  var alt = alertify;
  var quant = parseInt($('#number').html());
  quant += 1;
  alt.set('notifier', 'position', 'top-right');
  alt.notify('Product was successfully added to bag!', 'success', 5);
  $('#number').html(quant);
};

/*
 *Inicializa scripts na página.
 */
$(function() {
  var merlin = new Merlin();
  merlin.init();
});