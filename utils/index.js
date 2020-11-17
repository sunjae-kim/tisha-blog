export const formatTime = function (createdAt) {
  const today = new Date()
  const target = new Date(createdAt.seconds * 1000)

  const minuets = Math.floor((today.getTime() - target.getTime()) / 1000 / 60)
  if (minuets < 1) return '방금 전'
  if (minuets < 60) return `${minuets}분 전`

  const hours = Math.floor(minuets / 60)
  if (hours < 24) return `${hours}시간 전`

  const days = Math.floor(minuets / 60 / 24)
  if (days < 365) return `${days}일 전`

  return `${target.getFullYear()}년 ${target.getMonth()}월 ${target.getDate()}일`
}
