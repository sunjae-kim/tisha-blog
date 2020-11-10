export const state = () => ({
  data: [
    { id: 1, label: '저장소', path: 'store' },
    { id: 2, label: '놀이터', path: 'fun' },
    { id: 4, label: '잡담', path: 'talk' },
    { id: 5, label: '기타', path: 'etc' },
  ],
  currentPage: '',
})

export default {
  state,
}
