$(function () {
    // gnbWrap과 대메뉴 변수를 설정합니다.
    var wrap = $('.gnbWrap');
    var menu = $('.gnbWrap > ul.gnb > li');
    var pageURL = window.location.href; // 현재 페이지 URL을 가져옵니다.
    var activeMenu;

    // 메뉴에 마우스 이벤트를 연결합니다.
    menu.on({
        // 마우스를 메뉴 위에 올렸을 때
        mouseover: function () {
            var tg = $(this); // 현재 메뉴 요소를 선택합니다.
            menu.removeClass('on'); // 모든 메뉴에서 'on' 클래스를 제거합니다.
            tg.addClass('on'); // 이벤트가 발생한 메뉴에 'on' 클래스를 추가합니다.
            var th = 68 + tg.find('.sGnbArea').height(); // 메뉴의 높이를 계산합니다.
            wrap.stop().animate({
                height: th
            }); // wrap의 높이를 애니메이션으로 변경합니다.
        },
        // 마우스가 메뉴를 벗어났을 때
        mouseout: function () {
            var tg = $(this); // 현재 메뉴 요소를 선택합니다.
            tg.removeClass('on'); // 'on' 클래스를 제거합니다.
            var th = 68; // 초기 Wrap 높이로 설정합니다.
            wrap.stop().animate({
                height: th
            }); // wrap의 높이를 애니메이션으로 변경합니다.
        }
    });

    // 메뉴 아이템을 순회하며 활성 메뉴를 찾습니다.
    menu.each(function (i) {
        var tg = $(this); // 현재 메뉴 아이템을 선택합니다.
        var sub = tg.find('> .sGnbArea > ul > li'); // 서브메뉴의 li 요소들을 선택합니다.
        var menuURL = tg.children('a').attr('href'); // 현재 메뉴의 링크 URL을 가져옵니다.
        var active = pageURL.indexOf(menuURL);
        if (active > -1) activeMenu = tg; // 현재 페이지 URL이 메뉴의 URL과 일치하면 활성 메뉴로 설정합니다.
        sub.each(function (i) {
            var tg = $(this); // 현재 서브 메뉴 아이템을 선택합니다.
            var subURL = tg.children('a').attr('href'); // 아이템의 링크 URL을 가져옵니다.
            active = pageURL.indexOf(subURL); // 현재 페이지 URL에 하위 메뉴 URL이 포함되어 있는지 확인합니다.
            if (active > -1) activeMenu = tg; // 포함된 경우 활성 메뉴로 설정합니다.
        });

        // 하위 메뉴 아이템에 대한 이벤트 핸들러를 설정합니다.
        sub.on({
            // 마우스를 아이템 위에 올렸을 때
            mouseover: function (event) {
                var tg = $(this); // 현재 요소를 선택합니다.
                sub.removeClass('on'); // 모든 서브메뉴의 'on' 클래스를 제거합니다.
                tg.addClass('on'); // 현재 서브메뉴에 'on' 클래스를 추가합니다.
            },
            // 마우스가 아이템을 벗어났을 때
            mouseout: function () {
                var tg = $(this); // 현재 요소를 선택합니다.
                tg.removeClass('on'); // 현재 하위 메뉴 아이템의 'on' 클래스를 제거합니다.
            }
        });
    });

    var setIntervalId; // setInterval을 위한 변수를 선언합니다.

    // 슬라이드 자동 전환을 위한 타이머 함수를 설정합니다.
    function timer() {
        setIntervalId = setInterval(function () {
            var n = current + 1;
            if (n == visual.size()) {
                n = 0; // 다음 슬라이드가 없으면 처음 슬라이드로 돌아갑니다.
            }
            button.eq(n).click(); // 다음 슬라이드로 이동하기 위해 버튼을 클릭합니다.
        }, 3000); // 3초마다 슬라이드를 자동으로 전환합니다.
    }

    var current = 0; // 현재 슬라이드의 인덱스를 저장하는 변수를 선언합니다.

    // 슬라이드 이동 함수를 설정합니다.
    function move(i) {
        if (current == i) return; // 현재 슬라이드와 목표 슬라이드가 동일하면 함수를 종료합니다.
        var currentEl = visual.eq(current); // 현재 슬라이드 요소를 선택합니다.
        var nextEl = visual.eq(i); // 목표 슬라이드 요소를 선택합니다.

        currentEl.css({
            left: '0%'
        }).stop().animate({
            left: '-100%'
        }); // 현재 슬라이드를 왼쪽으로 이동시킵니다.

        nextEl.css({
            left: '100%'
        }).stop().animate({
            left: '0%'
        }); // 목표 슬라이드를 화면에 표시합니다.

        current = i; // 현재 슬라이드 인덱스를 업데이트합니다.
    }

    // 슬라이드 자동 전환을 멈추는 함수를 설정합니다.
    function stopAutoSlide() {
        clearInterval(setIntervalId);
    }


    // 이미지가 끝까지 갔을 때 처음 이미지로 돌아가는 코드
    function checkLastSlide() { // ★==
        var nextSlideIndex = current + 1;
        if (nextSlideIndex === visual.size()) {
            nextSlideIndex = 0;
        }
        button.eq(nextSlideIndex).click();
    }




    // 슬라이드 영역에 마우스를 올렸을 때와 벗어났을 때의 이벤트를 설정합니다.
    $('#main_slides').on({
        mouseover: stopAutoSlide, // 마우스를 올렸을 때 자동 슬라이드를 멈춥니다.
        mouseout: timer // 마우스를 벗어났을 때 다시 자동 슬라이드를 시작합니다.
    });

    timer(); // 페이지 로딩 후 초기 슬라이드 자동 시작





    $(window).scroll(function () {
        var scrollTopNum = $(document).scrollTop() + 170; // 수정 ★==
        if (scrollTopNum <= 200) {
            scrollTopNum = 200; // 초기값이 200 이하인 경우 200으로 고정하도록 변경★==
        }
        $("#quick").stop().animate({
            top: scrollTopNum
        }, 700);
    });

    $("#quick .arrow").on("click", function () {
        $("html,body").stop().animate({
            scrollTop: 0
        }, 400);
    });

    var visual = $('#main_slides > li'); // visual 변수 선언  ★==
    var button = $('.btn_wrap > ul > li'); // button 변수 선언  ★==
    var autoSlideIntervalId;





    button.on('click', function () {
        var idx = $(this).index(); // 클릭한 버튼의 인덱스를 가져옵니다.
        move(idx); // 클릭한 버튼에 해당하는 슬라이드로 이동합니다.
    });
    
    var autoSlideIntervalId; // 슬라이드 자동 전환을 위한 인터벌 ID를 저장하는 변수를 선언합니다.
    
    function startAutoSlide() {
        autoSlideIntervalId = setInterval(function () {
            var nextSlideIndex = current + 1;
            if (nextSlideIndex === visual.size()) {
                nextSlideIndex = 0; // 다음 슬라이드가 없으면 첫 번째 슬라이드로 돌아갑니다.
            }
            button.eq(nextSlideIndex).click(); // 다음 슬라이드로 이동하기 위해 버튼을 클릭합니다.
        }, 3000); // 3초마다 슬라이드를 자동으로 전환합니다.
    }
    
    startAutoSlide(); // 페이지 로딩 후 초기 슬라이드 자동 시작
    




    // 신제품 슬라이드 
    var slidesProduct = $("div.newPro3ea > ul > li");
    var indicators = $("div.newPro3ea .inds .indicator");
    var autoSlideIntervalIdProduct;
    var currentSlideIndexProduct = 0;
    
    function moveToSlideProduct(index) {
        if (currentSlideIndexProduct === index) return;
    
        var slideWidth = slidesProduct.width();
        var offset = -index * slideWidth;
    
        // 자연스러운 슬라이드 전환을 위한 애니메이션 추가
        $("div.newPro3ea > ul").animate({ left: offset + "px" }, 500, function () {
            slidesProduct.removeClass("on");
            slidesProduct.eq(index).addClass("on");
        });
    
        currentSlideIndexProduct = index;
        updateIndicatorsProduct(index);
    }
    
    function startAutoSlideProduct() {
        autoSlideIntervalIdProduct = setInterval(function () {
            var nextSlideIndexProduct = currentSlideIndexProduct + 1;
    
            if (nextSlideIndexProduct === slidesProduct.length) {
                nextSlideIndexProduct = 0;
            }
    
            moveToSlideProduct(nextSlideIndexProduct);
        }, 2000);
    }
    
    function changeSlideProduct(index) {
        clearInterval(autoSlideIntervalIdProduct);
        moveToSlideProduct(index);
        startAutoSlideProduct();
    }
    
    function updateIndicatorsProduct(index) {
        indicators.removeClass("active");
        indicators.eq(index).addClass("active");
    }
    
    startAutoSlideProduct();
    
    indicators.click(function () {
        var index = $(this).index();
        changeSlideProduct(index);
    });
    

});
