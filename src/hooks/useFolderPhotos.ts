import { useEffect, useState } from 'react';

/**
 * 폴더에 올려둔 사진을 찾아서 돌려준다.
 *
 * public/gallery/<폴더>/ 안에 1.jpg, 2.jpg ... 로 넣기만 하면 되고
 * 코드는 고칠 필요가 없다. 없는 번호는 조용히 건너뛴다.
 *
 * 정적 호스팅에는 "폴더 안에 뭐가 있는지" 물어볼 방법이 없어서,
 * 번호를 하나씩 불러보고 실제로 열리는 것만 모은다.
 */
const MAX = 24;
const EXT = ['jpg', 'jpeg', 'png', 'webp'];

export function useFolderPhotos(dir: string): string[] {
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    const hits: Array<{ n: number; src: string }> = [];
    let left = MAX;

    const settle = () => {
      left -= 1;
      if (left > 0 || cancelled) return;
      hits.sort((a, b) => a.n - b.n);
      setPhotos(hits.map((h) => h.src));
    };

    const seek = (n: number) => {
      let tries = 0;
      const img = new Image();
      img.onload = () => {
        hits.push({ n, src: `${dir}${n}.${EXT[tries]}` });
        settle();
      };
      img.onerror = () => {
        tries += 1;
        if (tries < EXT.length) img.src = `${dir}${n}.${EXT[tries]}`;
        else settle();
      };
      img.src = `${dir}${n}.${EXT[0]}`;
    };

    for (let i = 1; i <= MAX; i += 1) seek(i);

    return () => {
      cancelled = true;
    };
  }, [dir]);

  return photos;
}
