import HomeWrapper from './HomeWrapper'

async function getHomepageData() {

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'
    const response = await fetch(`${baseUrl}/homepage`, {
      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch homepage data')
    }

    const data = await response.json()
    return data

}

export default async function Home() {
  const homepageData = await getHomepageData()
  // اطلاعات تم قبلاً در homepageData.data.theme موجود است

  return <HomeWrapper homepageData={homepageData} />
}
