import Card from '@/components/Card'

const testCard = {
  objectID: 123,
  title: "Název",
  elementDescrition: "Popis",
  repository: "Metropolitan Museum of Art, New York, NY",
  primaryImage: "https://images.metmuseum.org/CRDImages/ad/original/181517.jpg",
}

export default function CardList() {
  return (
    <div
      className="max-w-6xl mx-auto grid gap-y-6 gap-x-4 justify-center"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
    >
      <Card data={testCard} />
      <Card data={testCard} />
      <Card data={testCard} />
      <Card data={testCard} />
      <Card data={testCard} />
      <Card data={testCard} />
      <Card data={testCard} />
      <Card data={testCard} />
      <Card data={testCard} />
      <Card data={testCard} />
      <Card data={testCard} />
      <Card data={testCard} />
      <Card data={testCard} />
      <Card data={testCard} />
    </div>
  )
}