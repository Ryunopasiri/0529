document.addEventListener('DOMContentLoaded', function() {

    // モバイルメニューのトグル機能
    const menuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('header nav');

    if (menuButton && nav) {
        menuButton.addEventListener('click', function() {
            nav.classList.toggle('active');
            // アクセシビリティ対応: aria-expanded属性を切り替える
            const expanded = nav.classList.contains('active');
            menuButton.setAttribute('aria-expanded', expanded);
            menuButton.setAttribute('aria-label', expanded ? 'メニューを閉じる' : 'メニューを開く');
        });
    }

    // 次戦グランプリまでのカウントダウンタイマー (簡易版、実際の目標日時を設定してください)
    const countdownElement = document.getElementById('countdown-timer');
    if (countdownElement) {
        // 例: 2025年3月15日 15:00:00 を目標日時とする
        const targetDate = new Date("Mar 15, 2025 15:00:00").getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                countdownElement.innerHTML = "レース開催中または終了";
                clearInterval(interval); // カウントダウン終了
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = 
                days + "日 " + 
                String(hours).padStart(2, '0') + "時間 " + 
                String(minutes).padStart(2, '0') + "分 " + 
                String(seconds).padStart(2, '0') + "秒";
        };
        
        const interval = setInterval(updateCountdown, 1000);
        updateCountdown(); // 初回実行
    }

    // スムーズスクロール (アンカーリンク用)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // hrefが"#"だけ、または""の場合は何もしない (トップに戻るデフォルト動作を防ぐためなど)
            if (href === '#' || href === '') return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // モバイルメニューが開いていたら閉じる
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuButton.setAttribute('aria-expanded', 'false');
                    menuButton.setAttribute('aria-label', 'メニューを開く');
                }
            }
        });
    });

    // ここに他のJavaScriptの機能を追加していきます
    // 例: ギャラリーのスライドショー、フォームのバリデーションなど
    console.log("2025 F1 Fan Site Initialized!");

});