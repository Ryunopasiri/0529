document.addEventListener('DOMContentLoaded', function() {
    // モバイルメニューのトグル
    const menuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('header nav');

    if (menuButton && nav) {
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
            const isActive = nav.classList.contains('active');
            menuButton.setAttribute('aria-expanded', isActive);
            menuButton.textContent = isActive ? '✕' : '☰'; // アイコン変更
        });
    }

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // hrefが"#"だけ、または""の場合はデフォルトの動作を許可 (ページトップなど)
            // 今回のケースではhref="#"のリンクは無いので、ほぼ常にpreventDefaultされる
            if (href === '#' || href === '' || !document.querySelector(href)) {
                // hrefが"#"だけ、または存在しない要素へのリンクの場合は何もしないか、
                // デフォルト動作（ページトップなど）をさせたい場合はこのブロックを調整
                return;
            }

            e.preventDefault(); // 有効なアンカーリンクの場合のみ実行
            const targetElement = document.querySelector(href);

            if (targetElement) {
                const header = document.querySelector('header');
                const headerOffset = header ? header.offsetHeight : 70; // ヘッダーの高さを取得、なければデフォルト値
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // モバイルメニューが開いていたら閉じる
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuButton.setAttribute('aria-expanded', 'false');
                    menuButton.textContent = '☰';
                }
            }
        });
    });

    // スクロールに応じたヘッダーのスタイル変更
    const header = document.querySelector('header');
    if (header) { // header要素が存在することを確認
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(var(--dark-bg-rgb), 0.95)'; // 少し濃くする
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
            } else {
                header.style.backgroundColor = 'rgba(var(--dark-bg-rgb), 0.8)';
                header.style.boxShadow = 'none';
            }
        });
    }


    // Glitch H1のdata-text属性を設定
    const glitchH1 = document.querySelector('.glitch');
    if (glitchH1) {
        glitchH1.setAttribute('data-text', glitchH1.textContent);
    }

    console.log("Nova Spark Landing Page Initialized!");
});