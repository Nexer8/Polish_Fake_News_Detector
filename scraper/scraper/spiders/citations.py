import scrapy

class CitationSpider(scrapy.Spider):
    name = 'citations'
    start_urls = [
        'https://demagog.org.pl/wypowiedzi/'
    ]

    def parse(self, response):
        detail_urls = response.css('.title-archive a')
        yield from response.follow_all(detail_urls, callback=self.parse_detail)

        next_page_url = response.css('.next')
        yield from response.follow_all(next_page_url, callback=self.parse)

    def parse_detail(self, response):
        content = response.css('.hyphenate p::text').get()
        if not content or len(content) < 5:
            content = response.css('.hyphenate span::text').get()
        
        if not content or len(content) < 5:
            # last is cookie consent
            content = ''.join(response.css('.hyphenate span::text').getall()[:-1])

        content = content.replace('\xa0', ' ').replace('\"', '').replace('\'','').strip()

        yield {
            'content': content,
            'author': response.css('.person-name a::text').get(),
            'label': response.css('.ocena::text').get()
        }

