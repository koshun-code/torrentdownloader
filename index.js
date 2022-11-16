import WebTorrent from 'webtorrent';
import fs from 'fs';
import path from 'path';

const client = new WebTorrent();

const getPath = (paths) => path.resolve(...paths.split('/').slice(1));

// console.log(process.argv[2]);
// console.log(getPath(process.argv[2]));

const pathTotorrent = fs.readFileSync(getPath(process.argv[2]) + `/${process.argv[2]}`);

//console.log(pathTotorrent); 

client.add(pathTotorrent, {path: getPath('/books')}, (torrent) => {
  const files = torrent.files;
  let length = files.length;
  console.log(`Колличество файлов для скачивания ${length}`);
  files.map((file) => {
    const source = file.createReadStream();
    const destination = fs.createWriteStream(file.name);
    source.on('end', () => {
      console.log(`file: ${file.name}`);
      length -= 1;
      if (length === 0) {
        process.exit();
      }
    }).pipe(destination);
  })
});