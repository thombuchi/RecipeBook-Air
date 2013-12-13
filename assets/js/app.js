   $(document).ready(function () {

      var firstUrl = '/views/settings/language.html';
      loadNewPage(firstUrl);

    });


    function loadNewPage(url) {

      $('#app-container').load(url, function () {

        $('#main-container').hide();
        scriptOnLoad(url);

        $('#main-container').fadeIn();
        $('a.new-page').click(function(event){

          event.preventDefault();
            var a_href = $(this).attr('href');
            $('#main-container').fadeOut(function() {
              loadNewPage(a_href);
            });
          
        } );

        $('#submit').click(function(event){

          event.preventDefault();
            var a_href = $(this).data('url');
            $('#main-container').fadeOut(function() {
              loadNewPage(a_href);
            });
          
        } );





      });


    }



    function scriptOnLoad(url) {

      if(url=='/views/user/register.html') {
        registerOnLoad();
      }
      else if(url=='/views/settings/language.html'){
        languageOnLoad();
      }
      else if(url=='/views/user/nickname.html'){
        nicknameOnLoad();
      }

    }


    function nicknameOnLoad() {


        if(air.EncryptedLocalStore.getItem("nickname")){
            var storedValue = air.EncryptedLocalStore.getItem("nickname");
            var nick = (storedValue.readUTFBytes(storedValue.length));
            $('#inputNickname').val(nick);
        }
        else {
           // Do something
        }

        $('#submit').bind( "click",
          function(){
            
              var str = $("#inputNickname").val();
              var bytes = new air.ByteArray();
              bytes.writeUTFBytes(str);
              air.EncryptedLocalStore.setItem("nickname", bytes);
            
          });
            

    }


    function languageOnLoad() {


        if(air.EncryptedLocalStore.getItem("language")){
            var storedValue = air.EncryptedLocalStore.getItem("language");
            var id = (storedValue.readUTFBytes(storedValue.length));
            $('#' + id).prop("checked", true);
        }
        else {
            var str = "lEnglish";
            var bytes = new air.ByteArray();
            bytes.writeUTFBytes(str);
            air.EncryptedLocalStore.setItem("language", bytes);
        }

        $('#language-check label input:radio').change(
          function(){
            if ($(this).is(':checked')) {
              var str = $(this).get(0).id;
              var bytes = new air.ByteArray();
              bytes.writeUTFBytes(str);
              air.EncryptedLocalStore.setItem("language", bytes);
            }
          });
            

    }




    function registerOnLoad() {

      $('#register').isHappy({
        fields: {
          '#inputEmail': {
            required: true,
            message: 'You are missing your email!',
            test: happy.email,
            container: 'labelEmail'
          },
          '#inputNickname': {
            required: true,
            message: 'Enter your nickname please.',
            container: 'labelNickname'
          },
          '#inputPassword': {
            required: true,
            message: 'Your password please.',
            container: 'labelPassword'
          },
          '#inputConfirmPassword': {
            required: true,
            message: "Passwords don't match.",
            container: 'labelPassword',
            test: function (){
                  var password = $("#inputPassword").val();
              var confirmPassword = $("#inputConfirmPassword").val();
              if(password===confirmPassword){
                return true;
              }
              else
                {return false;}
            }
          },
          '#checkboxAccept': {
            required: true,
            message: "You must accept them.",
            container: 'labelAccept',
            test: function () {
              if ($('#checkboxAccept').is(':checked')){
                return true;
              }
              else {return false;}
            }
          }

        }
      });
    }