const reasonsForReport = [
    "It's Spam", "Bullying or Harrassment", "Nudity or Pornography", "Self Injury", "Violence", "Hate speech or symbols"
]

function setValue(e) {
    if (e.value === "on" || !e.value) e.value = reasonsForReport[parseInt(e.id) - 1]
    else e.value = ""
}
