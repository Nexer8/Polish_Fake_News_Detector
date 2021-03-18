import re
import scrapy


class CitationSpider(scrapy.Spider):
    name = 'citations'
    start_urls = [
        'https://demagog.org.pl/wypowiedzi/'
    ]
    tag_pattern = re.compile(r'<[^>]*>')
    spaces_pattern = re.compile(r' +')

    def parse(self, response):
        detail_urls = response.css('.title-archive a')
        yield from response.follow_all(detail_urls, callback=self.parse_detail)

        next_page_url = response.css('.next')
        yield from response.follow_all(next_page_url, callback=self.parse)

    def parse_detail(self, response):
        content = response.css('.hyphenate').get()
        date = response.css('.date-content').get()

        # remove date tags and text (if exists)
        if date:
            content = content.replace(date, '')

        # clean all html tags
        content = self.tag_pattern.sub(' ', content)

        # get rid of nbsp and \n, convert ampersand code to sign
        content = content.replace('\xa0', ' ').replace('\n', ' ').replace('&amp;','&').strip()

        # remove unnecessary spaces
        content = self.spaces_pattern.sub(' ', content)

        yield {
            'content': content,
            'author': response.css('.person-name a::text').get(),
            'label': response.css('.ocena::text').get()
        }
