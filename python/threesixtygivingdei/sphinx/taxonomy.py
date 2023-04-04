
import json
import os
from sphinx.directives.code import LiteralInclude

from docutils.parsers.rst import Directive, directives
from docutils import nodes

try:
    from myst_parser.main import to_docutils
except ModuleNotFoundError:
    from myst_parser.config.main import MdParserConfig
    from myst_parser.mdit_to_docutils.base import make_document
    from myst_parser.mdit_to_docutils.sphinx_ import SphinxRenderer
    from myst_parser.parsers.mdit import create_md_parser

    # to_docutils was removed in myst-parser>=0.18.
    def to_docutils(text):
        # Code is similar to MystParser.parse and myst_parser.parsers.docutils_.Parser.parse.
        parser = create_md_parser(MdParserConfig(), SphinxRenderer)
        parser.options["document"] = make_document()
        return parser.render(text)

    
taxonomy_data_file = os.path.join(
    os.path.dirname(os.path.realpath(__file__)),
    "..",
    "..",
    "..",
    "taxonomy",
    "taxonomy.json"
)
with open(taxonomy_data_file) as fp:
    TAXONOMY_DATA = json.load(fp)



class DEITaxonomy(LiteralInclude):
    headers = ['Category', 'Sub-Category', 'Name','Description', ]
    widths = [1, 1, 1,1]
    option_spec = {
        'prefix': directives.unchanged,
    }

    def run(self):
        prefix = self.options['prefix']
        data = [i for i in TAXONOMY_DATA['population_groups'] if i['prefix'] == prefix]
        if data:
            return [self.table(data[0])]
        else:
            return []

    def table(self, data):
        tgroup = nodes.tgroup(cols=len(self.headers))
        for width in self.widths:
            tgroup += nodes.colspec(colwidth=width)

        table = nodes.table('', tgroup)
        header_row = nodes.row()
        for header in self.headers:
            header_row += self.cell(header, source='sphinxcontrib-jsonschema')

        tgroup += nodes.thead('', header_row)
        tbody = nodes.tbody()
        tgroup += tbody

        for category in data['categories']:
            row = nodes.row()
            row += self.cell(category['code'])
            row += self.cell('')
            row += self.cell(category['name'])
            row += self.cell(category['description'])
            tbody += row
            for sub_category in category['sub_categories']:
                row = nodes.row()
                row += self.cell('')
                row += self.cell(sub_category['code'])
                row += self.cell(sub_category['name'])
                row += self.cell(sub_category['description'])
                tbody += row

        return table


    def cell(self, text, morecols=0, source=None):
        entry = nodes.entry(morecols=morecols)
        if not isinstance(text, str):
            text = str(text)

        for child in to_docutils(text).children[:]:
            child.source = source
            entry += child
        return entry



class DEITaxonomyPopulationGroupDescription(LiteralInclude):
    option_spec = {
        'prefix': directives.unchanged,
    }

    def run(self):
        prefix = self.options['prefix']
        data = [i for i in TAXONOMY_DATA['population_groups'] if i['prefix'] == prefix]
        if data:
            text = data[0]['description']
            return to_docutils(text).children[:]
        else:
            return []


def setup(app):
    app.add_directive('dei_taxonomy', DEITaxonomy)
    app.add_directive('dei_taxonomy_population_group_description', DEITaxonomyPopulationGroupDescription )




