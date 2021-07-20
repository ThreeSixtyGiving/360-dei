import os
import sys
import datetime
import flattentool

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
sys.path.insert(0, os.path.join(os.path.dirname(os.path.realpath(__file__)),"..","python"))

from threesixtygivingdei.utils import compile

master_doc = 'index'

project = 'ThreeSixtyGiving Standard Extension for DEI'
copyright = '2021, 360Giving'
author = '360Giving'

extensions = ['threesixtygivingdei.sphinx.taxonomy', 'sphinxcontrib.jsonschema', 'sphinxcontrib.opendataservices']

html_static_path = [
    '_static',
]


html_extra_path = [
    '../_compiled',
    '../taxonomy/taxonomy.json',
    '../form/form.js',
    '../form/form.css',
]

templates_path = ['_templates']

html_context = {
    'now': datetime.datetime.now(),
    'theme_navigation_depth': 2
}
# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
# on_rtd is whether we are on readthedocs.org, this line of code grabbed from docs.readthedocs.org
import os
on_rtd = os.environ.get('READTHEDOCS', None) == 'True'

if not on_rtd:  # only import and set the theme if we're building docs locally
    import sphinx_rtd_theme
    html_theme = 'sphinx_rtd_theme'
    html_theme_path = [sphinx_rtd_theme.get_html_theme_path()]
# otherwise, readthedocs.org uses their theme by default, so no need to specify it

compile()
