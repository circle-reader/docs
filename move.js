const fs = require('fs');
const path = require('path');

function delfn(p) {
  if (fs.existsSync(p)) {
    //如果路径正确
    var list = fs.readdirSync(p); //获取该目录下资源列表
    list.forEach((v, i) => {
      //遍历该资源列表
      var path = p + '/' + v; //拼接新的路径
      var stats = fs.statSync(path); //获取每一个资源的信息
      if (stats.isFile()) {
        //如果是文件  删除
        fs.unlinkSync(path);
      } else {
        //如果是目录  调用自己
        delfn(path);
      }
    });
    fs.rmdirSync(p); //删除空目录
  }
}

function move() {
  const target = path.resolve(__dirname, './_book');

  if (!fs.existsSync(target)) {
    console.error('build first');
    return;
  }

  const dest = '/Users/ranhe/circle/website/drupal/docs';

  if (fs.existsSync(dest)) {
    delfn(dest);
  }

  fs.rename(target, dest, () => {
    console.log('all done');
  });
}

move();
