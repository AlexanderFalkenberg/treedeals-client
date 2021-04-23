import TimeAgo from 'timeago.js'
import de from 'javascript-time-ago/locale/de'

export default ({ app }, inject) => {
  inject('timeago', (string) => console.log('That was easy!', string))
}
