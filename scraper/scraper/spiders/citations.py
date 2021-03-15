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
        yield {
            'content': response.css('.hyphenate p::text').get().replace('\xa0', ' '),
            'label': response.css('.ocena::text').get()
        }

