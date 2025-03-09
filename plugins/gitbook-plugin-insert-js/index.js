module.exports = {
  hooks: {
    'page:before': function (page) {
      let jsToInsert = '';
      [
        '<script async src="https://www.googletagmanager.com/gtag/js?id=UA-156433061-6"></script>',
        "<script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);} gtag('js', new Date());gtag('config', 'UA-156433061-6');</script>",
        '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5908416007129457" crossorigin="anonymous"></script>',
      ].forEach((js) => {
        jsToInsert += js;
      });
      page.content = page.content + jsToInsert;
      return page;
    },
  },
};
