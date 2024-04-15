jQuery(document).ready(function ($) {

    $('.dropdownBtn').on('click', function () {
        if($(this).closest('.cmnDropDown').hasClass('active')){
            $(this).closest('.cmnDropDown').toggleClass('active');
            $(this).next('.cmnDropDownList').slideToggle();
        }else{
            $('.cmnDropDown').removeClass('active');
            $('.cmnDropDownList').slideUp();
            $(this).closest('.cmnDropDown').addClass('active');
            $(this).next('.cmnDropDownList').slideDown();
        }
    })

    $(document).mouseup(function (e) {
        var container = $(".cmnDropDown");
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.find('.cmnDropDownList').slideUp();
        }
    });


    $(function () {
        // copy content to clipboard
        function copyToClipboard(element) {
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val($(element).html()).select();
            document.execCommand("copy");
            $temp.remove();
        }

        // copy coupone code to clipboard
        $(".copy-link-btn").on("click", function () {
            let copyTxt = $(this).closest('.copy-link-wpr').find('.copy-txt');
            copyToClipboard(copyTxt);
            alert('Text Copied!')
        });


        $('.create_url').on('click', function(){
            $('.popup_outtr').removeClass('hidden');
            setTimeout(() => {
                $('.genarate-url-popUp').removeClass('invisible opacity-0 pointer-events-none translate-y-4');
            }, 100);

        });
        $('.popup-close-btn').on('click', function(){
            $('.genarate-url-popUp').addClass(' opacity-0 pointer-events-none translate-y-4');
            setTimeout(() => {
                $('.genarate-url-popUp').addClass('invisible');
                $('.popup_outtr').addClass('hidden');
        }, 400);
        })
    });


    $('.navbar-toggler').on('click', function(){
        $('.navbar-toggler .stick').toggleClass('open');
        $('.left_sidebar').toggleClass('-translate-x-full');
        $('.navoverlay').toggleClass('hidden');
        $('body').toggleClass('overflow-hidden');
    })
})



//--------------------Custom Tab JS---------------------//
const listItems = document.querySelectorAll(".tabList li");
const content = document.querySelectorAll(".each_tabs");
const changeBtn = document.querySelectorAll(".tabBtn");
document.querySelector(".tabList li").classList.add("current");
document.querySelector(".current .rghtArrw").classList.remove('opacity-0');
content.forEach((content) =>{
    content.classList.add("hidden");
});
document.querySelector(".each_tabs").classList.remove('hidden');
let currentIndex = 0;
updateContent(currentIndex);
function updateContent(index){
    changeBtn.forEach((btn) => {
        btn.addEventListener("click",function(e){
            if((currentIndex + 1) == content.length){
                return false
            };
            //List Items
            currentIndex = (currentIndex + 1) % listItems.length;
            const previtem = (currentIndex - 1) % listItems.length;
            //Contents
            contentIndex = (currentIndex) % content.length;
            const prevContent = (currentIndex - 1) % content.length;
            //Completed Item
            const prevlist = listItems[previtem];
            prevlist.classList.add("completed");
            prevlist.classList.remove("current");
            prevlist.querySelector(".rghtArrw").classList.add('opacity-0');
            //Current item
            const list = listItems[currentIndex];
            list.classList.add("current");
            let duration = setTimeout(() => {
                clearInterval(duration);
                list.querySelector(".rghtArrw").classList.remove('opacity-0');
            }, 200);
            let duration2 = setTimeout(() => {
                clearInterval(duration2);
                prevlist.querySelector(".doneTick").classList.remove('opacity-0');
            }, 200);
            // if(list.classList.contains()){
            //     // list.querySelector("span.live").fadeIn();/
            // }
            list.classList.remove("completed");

            //Completed Content
            const prevContentWrp = content[prevContent];
            prevContentWrp.classList.add("hidden");
            //Active Content
            const Content = content[contentIndex];
            Content.classList.remove("hidden");
            console.log(currentIndex);
        });
    });
};//Tab JS

